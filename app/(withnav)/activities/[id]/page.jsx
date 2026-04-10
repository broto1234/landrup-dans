import { getTokens } from '@/lib/auth';
import { activityById } from '@/services/activities/activityById-service';
import { userById } from '@/services/users/userById-service';
import ActivityDetail from '@/components/detail-page/ActivityDetail';

export default async function ActivityPage({ params }) {
  
  const { id } =  await params;

  const activity = await activityById(id);
  
  const {token, userId} = await getTokens();

  let user = null;

  if (token && userId) {
    try {
      const data = await userById(userId, token);
      if (data?.role === "default") {
        user = data;
      }
    } catch (err) {
      user = null;
    }
  }

  return <ActivityDetail activity={activity} user={user} token={token} />
};