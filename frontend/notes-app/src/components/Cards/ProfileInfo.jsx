const ProfileInfo = ({userInfo,onLogout}) => {

  return (
    <div className="flex items-center gap-3">
            <p className="text-sm font-medium">{userInfo?.fullname}</p>
            <button className="text-sm text-red-500 underline" onClick={onLogout}>Logout</button>
    </div>
  )
}

export default ProfileInfo