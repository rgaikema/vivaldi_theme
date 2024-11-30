window.addEventListener('load', function () {
    checkDOMMutations();
}, false);

const checkDOMMutations = () => {
    // Select the node that will be observed for mutations
    const targetNode = document.getElementById('browser');

    if (!targetNode) {
        //The node we need does not exist yet.
        //Wait 500ms and try again
        window.setTimeout(checkDOMMutations, 500);
        return;
    }

    // Options for the observer (which mutations to observe)
    // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
    const config = { childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                let divID = mutation.addedNodes[0].id;

                if (divID === "modal-bg" && mutation.addedNodes[0].classList.contains("qc-modal")) {
                    targetNode.classList.add("blurred");
                }
            } else if (mutation.type === 'childList' && mutation.removedNodes.length > 0) {
                let divID = mutation.removedNodes[0].id;
                if (divID === "modal-bg") {
                    targetNode.classList.remove("blurred");
                }
            }
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

    // Later, you can stop observing
    // observer.disconnect();
}