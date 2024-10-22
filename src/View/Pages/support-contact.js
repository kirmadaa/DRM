import { Link } from "react-router-dom"

import LogoNew from "../../assets/images/logo/logoNew.svg";

const SupportContact = () => {
    return (
        <>
            <section className="flex items-center h-screen p-14">
                <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 gap-20">

                    <div className="flex flex-col gap-10 text-center items-center">
                        <img
                            src={LogoNew}
                            className="mx-auto mb-5 w-[150px] lg:left-24"
                            alt="login-banner"
                        />
                        <div className="flex justify-start items-center">
                            <h2 className="font-bold text-5xl">
                                <span className="text-primary mr-1">Welcome to The Stackmentalist </span>
                            </h2>
                        </div>
                        <p className="text-2xl md:text-2xl my-3">Package not assigned to your organization so please contact admin</p>
                        <Link to='/crm/login' className="px-8 py-3 font-semibold rounded-2xl text-white bg-primary">Login</Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SupportContact