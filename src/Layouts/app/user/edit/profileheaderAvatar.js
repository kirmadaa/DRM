
import demouserAvatar from '../../../../assets/images/users/user-dummy-img.jpg';

const ProfileHeaderAvatar = ({ profile }) => {
    return (
        <div className="col-xxl-12 col-lg-12 col-md-12 col-12">
            <div className="card mt-n5">
                <div className="card-body p-4">
                    <div className="text-center">
                        <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                            <img src={demouserAvatar} className="rounded-circle avatar-xl img-thumbnail user-profile-image" alt="user-profile" />
                            <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                                <input id="profile-img-file-input" type="file" className="profile-img-file-input" />
                                <label htmlFor="profile-img-file-input" className="profile-photo-edit avatar-xs">
                                    <span className="avatar-title rounded-circle bg-light text-body">
                                        <i className='bx bxs-camera' ></i>
                                    </span>
                                </label>
                            </div>
                        </div>
                        <h5 className="text-capitalize fs-16 mb-1">{profile?.name}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeaderAvatar;