// Pages are dumb — they only know about their own content.
// They have no idea which layout wraps them. That's RouteProvider's job.
export default function HomePage() {
    return (
        <div className="home-page flex justify-center items-center w-full h-full">
            <div className="banner w-full h-full">
                <img src="https://images.ctfassets.net/rz1oowkt5gyp/dpVmczoTMbCYhIvYlxJkt/a24fc18991e38285391851ce79e88050/1_Project_Management_Trello_Board_2x.png" alt="Banner" className="w-full h-full object-cover" />

                <div className="content">
                    <h1 className='text-4xl'>Home</h1>
                    <p className='text-xl'>Manage your projects with ease</p>
                    <button className='btn btn-primary'> Get Started</button>
                </div>
            </div>

            <div className="features">
                <div className="feature">
                    <i className="fa-solid fa-check"></i>
                    <h3>Feature 1</h3>
                    <p>Description 1</p>
                </div>
                <div className="feature">
                    <i className="fa-solid fa-check"></i>
                    <h3>Feature 2</h3>
                    <p>Description 2</p>
                </div>
                <div className="feature">
                    <i className="fa-solid fa-check"></i>
                    <h3>Feature 3</h3>
                    <p>Description 3</p>
                </div>
            </div>
        </div>
    )
}