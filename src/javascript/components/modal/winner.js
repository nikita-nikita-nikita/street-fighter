import {showModal} from "./modal";
import {createElement} from "../../helpers/domHelper";
export function showWinnerModal(fighter) {
    const img = createElement({
        tagName:"img",
        className:"",
        attributes:{src:fighter.source}
    });
    showModal({title:`Winner : ${fighter.name}` , bodyElement: img , onClose: () => {}});
}