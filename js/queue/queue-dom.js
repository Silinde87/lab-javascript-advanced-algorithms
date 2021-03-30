const queueUL = document.querySelector(".list-queue");
const queueInput = document.querySelector(".queue-input");
const warningTopQueue = document.querySelector("#queue-container .warning-top");
const warningBottomQueue = document.querySelector("#queue-container .warning-bottom");
const addQueue = document.querySelector(".btn-add-queue");
const dequeue = document.querySelector(".btn-take-dequeue");

const queue = new QueueDataStructure();

const clearQueueInput = () => {
	queueInput.value = "";
};

const generateListQueue = () => {
	queueUL.innerHTML = "";
	for (let i = queue.MAX_SIZE - 1; i >= 0; i--) {
		let liElem = document.createElement("li");
		if (queue.queueControl[i] !== undefined) {
			liElem.classList.add("active");
			liElem.innerHTML = queue.queueControl[i];
			queueUL.prepend(liElem);
		} else {
			liElem.classList.add("inactive");
			queueUL.appendChild(liElem);
		}
	}
};

generateListQueue();

const generateWarningQueue = (type) => {
	if (type === "underflow") {
		warningBottomQueue.style.display = "block";
	} else if (type === "overflow") {
		warningTopQueue.style.display = "block";
	}
};

const cleanWarningQueue = () => {
	warningBottomQueue.style.display = "none";
	warningTopQueue.style.display = "none";
};

const addToQueue = () => {
	if (queue.canEnqueue()) {
		queue.enqueue(queueInput.value);
		generateListQueue();
		clearQueueInput();
	} else {
		generateWarningQueue("overflow");
	}

	if (queue.queueControl.length === 1) cleanWarningQueue();
};

const removeFromQueue = () => {
	let activesLiElem = queueUL.getElementsByClassName("active");

	if (!queue.isEmpty()) {
		queue.dequeue();
		activesLiElem[activesLiElem.length - 1].innerHTML = "";
		activesLiElem[activesLiElem.length - 1].classList.toggle("inactive");
		activesLiElem[activesLiElem.length - 1].classList.toggle("active");
	} else {
		generateWarningQueue("underflow");
	}

	if (queue.queueControl.length === queue.MAX_SIZE - 1) cleanWarningQueue();
};

addQueue.addEventListener("click", addToQueue);
dequeue.addEventListener("click", removeFromQueue);
