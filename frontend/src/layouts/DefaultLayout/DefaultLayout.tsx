import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import type { DefaultLayoutProps } from './types';

export function DefaultLayout(props: DefaultLayoutProps) {
  return (
    <div className="DefaultLayout">
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}
