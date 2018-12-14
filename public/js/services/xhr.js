class Xhr {
    constructor(options) {
        this.options = options;
    }

    run() {
        fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            body: JSON.stringify({data: this.options})
        }).then(function (response) {
            console.log(response.json());
        }).then(function (myJson) {
                console.log('json');
        });
    }
}

export default Xhr;