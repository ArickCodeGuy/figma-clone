import {
  KButton,
  KInput,
  KSelect,
  type KSelectOption,
  KTitle,
} from 'figmaclone-uikit';
import { CSSProperties, useState, type FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { authController, createAuthData } from '../../api/authController';
import { popupClosed } from '../../store/popup';

type AuthMode = 'register' | 'login';

const AUTH_MODE_OPTIONS: KSelectOption<AuthMode>[] = [
  { label: 'Registration', value: 'register' },
  { label: 'Login', value: 'login' },
];

/** Shown with `showLoginPopup()`. Closes itself after a successful login or signup */
export function LoginPopup() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(createAuthData());
  const [mode, setMode] = useState<AuthMode>('register');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Otherwise the browser reloads the page

    setIsLoading(true);
    try {
      if (mode === 'login') {
        await authController.login(formData);
      } else {
        await authController.register(formData);
      }
      dispatch(popupClosed());
    } catch (err) {
      // @@TODO create store for notifications and figure out what component to use
      // msg: 'Could not reach the server'
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="LoginPopup">
      <KTitle>Authorization</KTitle>
      <form onSubmit={handleSubmit}>
        <div
          className="krow"
          style={{ '--column-gap': '10px' } as CSSProperties}
        >
          <div className="kcol-12">
            <KInput
              value={formData.username ?? ''}
              label="Username"
              required
              onChange={(username) => setFormData({ ...formData, username })}
              inputProps={{ autoComplete: 'username' }}
            />
          </div>
          <div className="kcol-12">
            <KInput
              value={formData.password ?? ''}
              label="Password"
              required
              onChange={(password) => setFormData({ ...formData, password })}
              inputProps={{
                type: 'password',
                autoComplete:
                  mode === 'login' ? 'current-password' : 'new-password',
              }}
            />
          </div>
          <div className="kcol-12">
            <KSelect
              label="Login or registration?"
              options={AUTH_MODE_OPTIONS}
              value={mode}
              onChange={setMode}
            />
          </div>
          <div className="kcol-12">
            <KButton type="submit" disabled={isLoading}>
              {mode === 'login' ? 'Log in' : 'Sign up'}
            </KButton>
          </div>
        </div>
      </form>
    </div>
  );
}
