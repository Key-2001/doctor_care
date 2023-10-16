import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getAppointmentsUserService } from "../../Services/UserService";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import DoctorCard from "../../components/Doctors/DoctorCard";

const MyBookings = () => {
  //! Props

  //! State
  const [msgErr, setMsgErr] = useState(null);
  const [data, setData] = useState([]);
  const { isLoading, isFetching, refetch } = useQuery(
    ["get-appointments"],
    getAppointmentsUserService,
    {
      enabled: false,
      onSuccess: (response) => {
        console.log("responseData", response);
        const { success } = response;
        if (!success) {
          setMsgErr(response?.message);
        } else {
          setData(response?.data);
        }
      },
    }
  );
  //! Function

  //! Effect
  useEffect(() => {
    refetch && refetch();
  }, []);
  //! Render
  return (
    <div>
      {isLoading && isFetching && !msgErr && <Loading />}
      {msgErr && !isLoading && !isFetching && <Error errMessage={msgErr} />}
      {!isLoading && !msgErr && !isFetching && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {(data || []).map((doctor) => {
            return <DoctorCard doctor={doctor} key={doctor._id} />;
          })}
        </div>
      )}
      {!isLoading && !isFetching && !msgErr && data?.length === 0 && (
        <h2 className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor">
          You did not book any doctor yet!
        </h2>
      )}
    </div>
  );
};

export default MyBookings;
