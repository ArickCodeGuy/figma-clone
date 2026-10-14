import { DefaultLayout } from '../../layouts/DefaultLayout/DefaultLayout';
import { SketchesPersonalSection } from './components/SketchesPersonalSection/SketchesPersonalSection';
import { SketchesCollaborateSection } from './components/SketchesCollaborateSection/SketchesCollaborateSection';

export function HomeView() {
  return (
    <DefaultLayout>
      <SketchesPersonalSection />
      <SketchesCollaborateSection />
    </DefaultLayout>
  );
}
