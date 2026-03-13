import type { HTMLAttributes, ReactElement } from 'react';
import styles from './Typography.module.css';

type HeadingProps = HTMLAttributes<HTMLHeadingElement>;
type ParagraphProps = HTMLAttributes<HTMLParagraphElement>;
type SpanProps = HTMLAttributes<HTMLSpanElement>;

export function Title({ className, children, ...props }: HeadingProps): ReactElement {
  const classes = [styles.title, className].filter(Boolean).join(' ');

  return (
    <h1 className={classes} {...props}>
      {children}
    </h1>
  );
}

export function BodyText({ className, children, ...props }: ParagraphProps): ReactElement {
  const classes = [styles.bodyText, className].filter(Boolean).join(' ');

  return (
    <p className={classes} {...props}>
      {children}
    </p>
  );
}

export function LabelText({ className, children, ...props }: SpanProps): ReactElement {
  return (
    <span className={className} {...props}>
      {children}
    </span>
  );
}

export function ErrorText({ className, children, ...props }: SpanProps): ReactElement {
  const classes = [styles.errorText, className].filter(Boolean).join(' ');

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}
