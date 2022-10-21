interface AlertProps {
  message: string;
  type: 'success' | 'error';
}

export function Alert({ message, type }: AlertProps) {
  return (
    <div className={`alert 
      ${type === 'success' ? 'alert-success' : 'alert-danger'}`}
    >
      {message}
    </div>
  )
}