import type { KTitleProps } from '../KTitle';

export type KAccordionProps = {
  title?: KTitleProps['children'];
  isOpen?: boolean;
  bottom?: React.ReactNode;
};
