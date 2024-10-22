import emailSent from '../assets/images/features/emailsent.png'

const EmailSent = () => {
  return (

    <div className="w-screen min-h-[74vh] flex justify-center items-center my-10">
      <div className="shadow-md bg-white rounded-lg sm:w-[500px] p-10">
        <h2 className="text-lg font-normal ">Successfully Email verification Sent to Your Email Id</h2>
        <center>
          <img width={240} src={emailSent} alt="email verify" />
        </center>
      </div>
    </div>
  )
}

export default EmailSent;