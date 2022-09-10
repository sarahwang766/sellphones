import content404png from '../../image/404.png';

function NotMatch(props){
    return(
        <div style={{verticalAlign:"middle", textAlign:"center"}}>
            <img src={content404png} alt="404"></img>
        </div>
    )
}

export default NotMatch;