interface LoadingProps {
  center?: boolean
}

export default function Loading({ center }: LoadingProps) {
  return <div className={`loading ${center && 'loading-center'}`} />
}
