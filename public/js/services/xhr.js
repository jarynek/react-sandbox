class Xhr {
    constructor(options) {
        this.options = options;
    }

    run() {
        document.body.classList.add('in-progress');
        fetch('https://jsonplaceholder.typicode.com/users', {
        }).then((response)=>{
        }).then((data)=>{
            setTimeout((e)=>{
                document.body.classList.remove('in-progress');
            }, 500);
        });
        console.log('dfsdf');
    }
}

export default Xhr
