import  {RoleDetails}  from "../../../Layouts";
import BreadCrumb from "../../../Components/breadcrumb";

const breadcrumblist = [
    { name: 'Dashboard', path: '/web/dashboard' },
]

const AppRoleDetail = () => {
    return (
        <div className="container mx-auto">
            <div className="py-2 w-full">
                <BreadCrumb
                    mainTitle='Roles'
                    active='Details'
                    breadcrumblist={breadcrumblist}
                />
            </div>
            <RoleDetails />
        </div>
    )
}

export default AppRoleDetail;