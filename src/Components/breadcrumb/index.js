import { Link } from "react-router-dom";

const BreadCrumb = ({ mainTitle, breadcrumblist, active }) => {
  return (
    <div className="w-full font-[300] text-md flex justify-between text-gray-500">
      <p className="text-primary font-semibold">{mainTitle}</p>
      <ol className="flex justify-start gap-2 flex-wrap">
        {breadcrumblist?.map((item, i) => {
          return (
            <li key={i} className="text-[#6A6A6D] font-semibold">
              <Link exact={`${item?.path}`} to={item?.path}>
                {item?.name} <span>/</span>
              </Link>
            </li>
          );
        })}
        <li className="text-gray-700 font-normal">{active}</li>
      </ol>
    </div>
  );
};

export default BreadCrumb;
