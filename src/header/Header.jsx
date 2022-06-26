import "./header.css"

export default function Header() {
  return (
    <div className="header">
        <div className="headerTitles">
            <span className="headerTitleSm">React & Node</span>
            <span className="headerTitleLg">Blog</span>    
        </div>
        <img className ="headerImg" src="https://images.pexels.com/photos/388415/pexels-photo-388415.jpeg?cs=srgb&dl=pexels-jahoo-clouseau-388415.jpg&fm=jpg" alt=""></img>    
    </div>
  )
}
