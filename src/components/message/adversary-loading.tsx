import Loading from '@/components/loading'

const AdversaryLoading = () => {
  return (
    <div className='group py-2 max-w-[80%]'>
      <div className="flex items-center rounded-lg p-4 w-fit bg-secondary/20 animate-pulse">
        <Loading/>
        <p>Typing...</p>
      </div>
    </div>
  )
}

export default AdversaryLoading