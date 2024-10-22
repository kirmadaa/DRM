import React from "react";
import { CChart } from "@coreui/react-chartjs";
const Google = () => {
  return (
    <div>
      <div className="container">
        <div className="lg:flex w-full">
          <div className="lg:w-1/2 md:w-1/2 sm:w-full ">
            <div className="char_in">
              <CChart
                type="line"
                data={{
                  series: {
                    1: { curveType: "function" },
                  },
                  labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                  ],
                  datasets: [
                    {
                      // label: "My First dataset",
                      // backgroundColor: "#ffd900",
                      // borderColor: "#0075e9",
                      // pointBackgroundColor: "#ffd900",
                      // pointBorderColor: "#0075e9",

                      data: [
                        15, 10, 23, 30, 28, 25, 35, 20, 25, 22, 29, 32, 28, 29,
                        50, 40,
                      ],
                      // data: forcastOverviewState.EnData,
                      borderColor: "#20C997",
                      borderWidth: 3,
                      // fill: true,
                      pointHoverRadius: 0,
                      pointHoverBorderColor: "transparent",
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      labels: {
                        color: "#000",
                      },
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        color: "#fff",
                      },
                      ticks: {
                        color: "black",
                      },
                    },
                    y: {
                      grid: {
                        color: "#fff",
                      },
                      ticks: {
                        color: "black",
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="lg:w-1/2 md:w-1/2 sm:w-full ">
            <div className="char_in">
              <CChart
                type="bar"
                height="0px"
                data={{
                  labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    // "May",
                    // "June",
                    // "July",
                  ],

                  datasets: [
                    {
                      label: "GitHub Commits",

                      backgroundColor: [
                        "#FF6384",
                        "#4BC0C0",
                        "#FFCE56",
                        "#E7E9ED",
                        "#36A2EB",
                      ],
                      width: ["50px"],
                      data: [15, 25, 22, 39],
                    },
                  ],
                }}
                labels="months"
                options={{
                  plugins: {
                    legend: {
                      labels: {
                        color: "blue",
                      },
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        color: "#fff",
                      },
                      ticks: {
                        color: "green",
                      },
                    },
                    y: {
                      grid: {
                        color: "#fff",
                      },
                      ticks: {
                        color: "green",
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="w-full lg:flex">
          <div className="lg:w-1/5 md:w-1/5 sm:w-full">
            <div className="Impr">
              <p>Search Impr. Share</p>
              <h2>30.63%</h2>
            </div>
          </div>
          <div className="lg:w-1/5 md:w-1/5 sm:w-full">
            <div className="Impr">
              <p>Search Impr. Share</p>
              <h2>30.63%</h2>
            </div>
          </div>
          <div className="lg:w-1/5 md:w-1/5 sm:w-full">
            <div className="Impr">
              <p>Search Impr. Share</p>
              <h2>30.63%</h2>
            </div>
          </div>
          <div className="lg:w-1/5 md:w-1/5 sm:w-full">
            <div className="Impr">
              <p>Search Impr. Share</p>
              <h2>30.63%</h2>
            </div>
          </div>
          <div className="lg:w-1/5 md:w-1/5 sm:w-full">
            <div className="Impr">
              <p>Search Impr. Share</p>
              <h2>30.63%</h2>
            </div>
          </div>
        </div>
        {/* 22222 */}
        <div className="w-full lg:flex">
          <div className="lg:w-1/5 md:w-1/5 sm:w-full">
            <div className="Impr">
              <p>Search Impr. Share</p>
              <h2>30.63%</h2>
            </div>
          </div>
          <div className="lg:w-1/5 md:w-1/5 sm:w-full">
            <div className="Impr">
              <p>Search Impr. Share</p>
              <h2>30.63%</h2>
            </div>
          </div>
          <div className="lg:w-1/5 md:w-1/5 sm:w-full">
            <div className="Impr">
              <p>Search Impr. Share</p>
              <h2>30.63%</h2>
            </div>
          </div>
          <div className="lg:w-1/5 md:w-1/5 sm:w-full">
            <div className="Impr">
              <p>Search Impr. Share</p>
              <h2>30.63%</h2>
            </div>
          </div>
          <div className="lg:w-1/5 md:w-1/5 sm:w-full">
            <div className="Impr">
              <p>Search Impr. Share</p>
              <h2>30.63%</h2>
            </div>
          </div>
        </div>
        {/* table */}

        <div className="overflow-x-auto py-8">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm ">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 pr-24 py-4 font-semibold text-gray-900 text-left text-sm">
                  CAMPAIGN
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold text-gray-900 text-left text-sm">
                  SEARCH IMPR,S...
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold text-gray-900 text-left text-sm">
                  STATUS
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold text-gray-900 text-left text-sm">
                  NETWORK
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold text-gray-900 text-left text-sm">
                  VIEW-THROUGH...
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold text-gray-900 text-left text-sm">
                  AVG CPC
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold text-gray-900 text-left text-sm">
                  CLICKS
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold text-gray-900 text-left text-sm">
                  CONVERSION
                </th>
                <th className="px-4 py-4"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="whitespace-nowrap px-4 py-3 font-semibold text-gray-900">
                  John Doe
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-700 font-semibold">
                  24/05/1995
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                  <a
                    href="#"
                    className="inline-block rounded bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    PAUSED
                  </a>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                  <a
                    href="#"
                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    PAUSED
                  </a>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-700 font-semibold">
                  $120,000
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-semibold">
                  $246.66
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-semibold">66</td>
                <td className="whitespace-nowrap px-4 py-3 font-semibold">7.18%</td>
              </tr>

              <tr>
                <td className="whitespace-nowrap px-4 py-3 font-semibold text-gray-900">
                  Jane Doe
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-700 font-semibold">
                  04/11/1980
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                  <a
                    href="#"
                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    PAUSED
                  </a>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                  <a
                    href="#"
                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    PAUSED
                  </a>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-700 font-semibold">
                  $100,000
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-semibold">
                  $246.66
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-semibold">56</td>
                <td className="whitespace-nowrap px-4 py-3 font-semibold">7.18%</td>
              </tr>

              <tr>
                <td className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">
                  Gary Barlow
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-700 font-semibold">
                  24/05/1995
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                  <a
                    href="#"
                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    PAUSED
                  </a>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                  <a
                    href="#"
                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    PAUSED
                  </a>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-700 font-semibold">
                  $20,000
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-semibold">
                  $246.66
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-semibold">66</td>
                <td className="whitespace-nowrap px-4 py-3 font-semibold">7.18%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Google;
