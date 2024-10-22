
const ChatLayout = ({ chatInfo }) => {

    return (
        <div>
           {chatInfo !== undefined && <iframe
                width="100%"
                height="100%"
                title="map"
                className="absolute inset-0"
                frameBorder={0}
                marginHeight={0}
                marginWidth={0}
                style={{ filter: "opacity(0.7)", paddingTop: '95px', paddingBottom: '40px' }}
                src={`http://43.204.45.115:3003/?email=${chatInfo?.email}&password=${chatInfo?.password}&register=${chatInfo?.chat}&firstname=${chatInfo.firstname}&lastname=${chatInfo?.lastname}&orgId=${chatInfo?.orgId}`}
            />}
        </div>
    )
}

export default ChatLayout;
