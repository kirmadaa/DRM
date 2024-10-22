import ApiDocListing from "./listing";
import GenrateAPI from './genrateApi'
import Developer from './developer'

const ApiDocLayout = () => {
    return (
        <div className="w-full ">
            <div className="flex gap-2 my-2 justify-end items-center">
                <Developer />
                <GenrateAPI />
            </div>
            <ApiDocListing />
        </div>
    )
}

export default ApiDocLayout;