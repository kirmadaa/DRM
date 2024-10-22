const Information = ({ profile }) => {
  return (
    <div className="font-bold min-h-[150px] rounded-2xl shadow-xl mt-8 bg-white p-3 w-full">
      <table className="w-full">
        <tbody className="w-full">
          <tr className="whitespace-nowrap">
            <th className="md:text-lg text-left text-xs" scope="row">
              Full Name :
            </th>
            <td className="capitalize text-gray-600 md:text-left text-xs">
              {profile?.name}
            </td>
          </tr>
          <tr>
            <th
              className=" font-bold text-left md:text-left text-xs"
              scope="row"
            >
              Mobile :
            </th>
            <td className="text-gray-600 md:text-left text-xs">
              {profile?.mobile}
            </td>
          </tr>
          <tr>
            <th
              className=" font-bold text-left md:text-left text-xs"
              scope="row"
            >
              E-mail :
            </th>
            <td className="text-gray-600 md:text-left text-xs">
              {profile?.emailId}
            </td>
          </tr>
          <tr>
            <th
              className=" font-bold text-left md:text-left text-xs"
              scope="row"
            >
              Location :
            </th>
            <td className="capitalize text-gray-600 md:text-left text-xs">
              {profile?.city?.cityTitle}{" "}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Information;
