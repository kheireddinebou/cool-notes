const bgImg = require("../images/welcome.jpg");

const Welcome = () => {
  return (
    <div className="welcome">
      <div className="imgWrapper">
        <img src={bgImg} alt="welcome" className="h-100 w-100 bgImg" />
      </div>
      <div className="text-wrapper">
        <div className="container">
          <div className="row pb-5 align-items-center">
            <div className="col-lg-6 mt-4 mt-lg-0">
              <span className="text-light text-wrap text-capitalize welcome-title">
                welcome <br /> to cool
                <br /> notes
              </span>
            </div>

            <div className="col-lg-6 mt-4 mt-lg-0">
              <span className="text-light text-wrap text-capitalize welcome-subtitle">
                Are you tired of constantly forgetting important information or
                misplacing important notes?
                <div className="my-md-3" /> Our notes app is here to help! With
                our easy-to-use and intuitive interface,
                <div className="my-md-3" /> you can quickly jot down any notes,
                reminders, or to-do lists and keep them all in one convenient
                location.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
