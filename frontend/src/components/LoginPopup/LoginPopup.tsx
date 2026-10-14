import {
  KButton,
  KCheckbox,
  KInput,
  KSelect,
  KSelectOption,
  KTitle,
} from 'figmaclone-uikit';
import { SubmitEvent, useState } from 'react';
import { authController, createAuthData } from '../../api/authController';

// @@TODO Sync popup with redux
export function LoginPopup() {
  // @@TODO handle updates
  const [formData, setFormData] = useState(createAuthData());
  const [isLogin, setIsLogin] = useState(0);

  async function handleSubmit(e: SubmitEvent) {
    // @@TODO check for errors
    if (isLogin) {
      const token = await authController.login(formData);
    } else {
      const token = await authController.register(formData);
    }
  }
  const authorizationOptions: KSelectOption<number>[] = [
    {
      label: 'Registration',
      value: 0,
    },
    {
      label: 'Login',
      value: 1,
    },
  ];

  return (
    <div>
      <KTitle>Authorization</KTitle>
      <form onSubmit={handleSubmit}>
        <div className="krow">
          <div className="kcol-12">
            <KInput value={formData.username} label="Username" />
          </div>
          <div className="kcol-12">
            <KInput
              value={formData.password}
              label="Password"
              inputProps={{ type: 'password' }}
            />
          </div>
          <div className="kcol-12">
            <KSelect
              label="Login or registration?"
              options={authorizationOptions}
              value={isLogin}
            />
          </div>
          <div className="kcol-12">
            <KButton type="submit">Submit</KButton>
          </div>
        </div>
      </form>
    </div>
  );
}
