import { DefaultLayout } from '../../layouts/DefaultLayout/DefaultLayout';
import { ScetchesPersonalSection } from './components/ScetchesPersonalSection/ScetchesPersonalSection';
import { ScetchesCollaborateSection } from './components/ScetchesCollaborateSection/ScetchesCollaborateSection';

export function HomeView() {
  return (
    <DefaultLayout>
      <ScetchesPersonalSection />
      <ScetchesCollaborateSection />
    </DefaultLayout>
  );
}
