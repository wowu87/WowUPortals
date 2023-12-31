import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import NProgressAxios from './nprogress-axios';

export default class BulkAction {
    constructor(path) {
        //This path use action url
        this['path'] = path;
        // Count selected items
        this['count'] = '';
        // Select action value ex: delete, export
        this['value'] = '*';
        // Select action message
        this['message'] = '';
        // Action type
        this['type'] = '';
        // Bulk action view status
        this['show'] = false;
        // Bulk action modal status
        this['modal'] = false;
        // Bulk action modal action
        this['loading'] = false;
        // Selected item list
        this['selected'] = [];
        // Select all items
        this['select_all'] = false;
    }

    // Change checkbox status
    select() {
        this.show = true;
        this.select_all = false;

        this.count = this.selected.length;

        if (this.count == document.querySelectorAll('[data-bulk-action]').length) {
            this.select_all = true;
        }

        if (! this.count) {
            this.show = false;

            this.hideSearchHTML();
        }
    }

    // Select all items action
    selectAll() {
        this.show = false;
        this.selected = [];
        this.hideSearchHTML();

        if (! this.select_all) {
            this.show = true;

            for (let input of document.querySelectorAll('[data-bulk-action]')) {
                this.selected.push(input.getAttribute('value'));
            }
        }

        this.count = this.selected.length;
    }

    change(type) {
        let action = document.getElementById('index-bulk-actions-' + type);

        this.value = type;

        this.message = action.getAttribute('data-message');

        if (typeof(this.message) == "undefined") {
            this.message = '';
        }

        this.path = action.getAttribute('data-path');

        this.type = '*';

        if (action.getAttribute('data-type')) {
            this.type = action.getAttribute('data-type');
        }

        return this.message;
    }

    // Selected item use action
    action() {
        if (this.value == '*') {
            return;
        }

        this.loading = true;

        // before version 2.0.23
        if (this.value == 'export') {
            this.type = 'download';
        }

        switch (this.type) {
            case 'download':
                let download_promise = Promise.resolve(window.axios({
                    url: this.path,
                    method: 'POST',
                    data:{
                        'handle': this.value,
                        'selected': this.selected
                    },
                    responseType: 'blob',
                }));

                download_promise.then((response) => {
                    if (response.data.type != 'application/json') {
                        const blob = new Blob([response.data], {type: response.data.type});
                        const url = window.URL.createObjectURL(blob);
                        const link = document.createElement('a');

                        link.href = url;

                        const contentDisposition = response.headers['content-disposition'];

                        let fileName = 'unknown';

                        if (contentDisposition) {
                            const fileNameMatch = contentDisposition.match(/filename=(.+)/);

                            if (fileNameMatch.length === 2) {
                                fileName = fileNameMatch[1];
                            }
                        }

                        link.setAttribute('download', fileName);

                        document.body.appendChild(link);

                        link.click();
                        link.remove();

                        window.URL.revokeObjectURL(url);

                        this.loading = false;
                        this.modal = false;
                        this.value = '*';
                        this.clear();

                        return;
                    }

                    window.location.reload(false);
                });

              break;
            case 'modal':
                this.loading = false;

                let modal_promise = Promise.resolve(window.axios.post(this.path, {
                    'handle': this.value,
                    'selected': this.selected
                }));

                modal_promise.then(response => {
                    let vue = document.querySelector('#app').__vue__;

                    if (vue === undefined) {
                        vue = document.querySelector('#main-body').__vue__;
                    }

                    vue.onDynamicComponentWithParams({
                        modal: true,
                        url: this.path,
                        title: response.data.data.title,
                        html: response.data.html,
                        buttons: response.data.data.buttons
                    });
                })
                .catch(error => {
                    //this.loading = false;
                    //this.modal = false;
                });

                break;
            default:
                let type_promise = Promise.resolve(window.axios.post(this.path, {
                    'handle': this.value,
                    'selected': this.selected
                }));

                type_promise.then(response => {
                    if (response.data.redirect === true) {
                        window.location.reload(false);
                    } else if (typeof response.data.redirect === 'string') {
                        window.location.href = response.data.redirect;
                    }
                })
                .catch(error => {
                    //this.loading = false;
                    //this.modal = false;

                    //window.location.reload(false);
                })
                .finally(function () {
                    //window.location.reload(false);
                });
        }
    }

    // Selected items clear
    clear() {
        this.show = false;
        this.select_all = false;
        this.selected = [];

        this.hideSearchHTML();
    }

    hideSearchHTML() {
        setInterval(() => {
            const search_box_html = document.querySelector('.js-search-box-hidden');

            if (search_box_html) {
                search_box_html.classList.add('d-none');
            }
        }, 5);
    };

    // Change enabled status
    status(item_id, event, notify) {
        let item = event.target;
        let status = (event.target.checked) ? 'enable' : 'disable';

        window.axios.get(this.path + '/' + item_id + '/' + status)
        .then(response => {
            let type = (response.data.success) ? 'success' : 'warning';

            if (! response.data.success) {
                if (item.checked) {
                    item.checked = false;
                } else {
                    item.checked = true;
                }
            }

            notify({
                message: response.data.message,
                timeout: 5000,
                icon: 'fas fa-bell',
                type
            });
        })
        .catch(error => {
        });
    }
}
