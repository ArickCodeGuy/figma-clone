export type KAlertType = 'SUCCESS' | 'WARNING' | 'ERROR';

export type KAlertProps = {
  /** Default `SUCCESS` */
  type?: KAlertType;
  title?: string;
  /** Message */
  children?: React.ReactNode;
  /** Shows a close button */
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
};
