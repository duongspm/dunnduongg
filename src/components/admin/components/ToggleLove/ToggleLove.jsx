import './toggle.css'
function ToggleLove (){
    return(
        <div class="love">
            <input id="switch" type="checkbox"/>
            <label class="love-heart" for="switch">
                <i class="left"></i>
                <i class="right"></i>
                <i class="bottom"></i>
                <div class="round"></div>
            </label>
        </div>
    )
}
export default ToggleLove