import { UserProfileDetail } from "../../../Layouts";
import BreadCrumb from "../../../Components/breadcrumb";

const breadcrumblist = [
    { name: 'Dashboard', path: '/web/dashboard' },
]

const AppUserProfileDetail = () => {
    return (
        <div className="container mx-auto">
            <div className="py-2 w-full">
                <BreadCrumb
                    mainTitle='Profile Details'
                    active='Profile Details'
                    breadcrumblist={breadcrumblist}
                />
            </div>
            <UserProfileDetail />
        </div>
    )
}

export default AppUserProfileDetail;