
function Footer() {
    const year = new Date().getFullYear()
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>© {year} Mini Trello. All rights reserved.</p>
            </div>
            <div className="footer-content">
                <p>Made with ❤️ by <strong className="text-primary"><a href="https://parbatsubedi.com.np" target="_blank" rel="noopener noreferrer">Parbat Subedi</a></strong></p>
            </div>
        </footer>
    )
}

export default Footer