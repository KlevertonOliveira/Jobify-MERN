import { useAppContext } from '../contexts/appContext';

export function Alert() {
  const { state: { alert } } = useAppContext();

  return (
    <div className={`alert 
      ${alert.type === 'success' ? 'alert-success' : 'alert-danger'}`}
    >
      {alert.message}
    </div>
  )
}