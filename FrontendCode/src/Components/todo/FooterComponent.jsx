
function FooterComponent(){
    const authContext =  useAuth()

    console.log(`Footer Component - ${authContext.number}`);

    return(
        <div className="footer">
            <hr /> Footer
        </div>
    )
}

export default FooterComponent;