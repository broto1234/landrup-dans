export default function ActivityCardInfo({ activity }) {
  return (
    <div className="px-4 py-3">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xs">{activity.name}</h2>
          <p className="text-xs">{activity.minAge < 14 ? `${activity.minAge} - ${activity.maxAge} år` : `${activity.minAge}+ år`}</p>
        </div>
        <div>
          <p className="text-xs capitalize">{activity.weekday}</p>
          <p className="text-[12px]">{activity.time}</p>
        </div>
      </div>
      <p className="text-xs mt-4">{activity.description}</p>
    </div>
  )
}