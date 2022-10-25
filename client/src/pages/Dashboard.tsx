import { useEffect } from 'react';

export function Dashboard() {

  const fetchData = async () => {
    try {
      const response = await fetch('/api/v1');
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <h1>Dashboard</h1>
  )
}