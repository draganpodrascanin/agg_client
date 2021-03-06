import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class TextEditor extends Component {
	render() {
		const { value, onChange } = this.props;

		const custom_config = {
			extraPlugins: [MyCustomUploadAdapterPlugin],
			toolbar: {
				items: [
					'heading',
					'|',
					'bold',
					'italic',
					'link',
					'bulletedList',
					'numberedList',
					'|',
					'blockQuote',
					'insertTable',
					'|',
					'imageUpload',
					'undo',
					'redo',
				],
			},
			table: {
				contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
			},
			link: {
				decorators: {
					openInNewTab: {
						mode: 'manual',
						label: 'Open in a new tab',
						attributes: {
							target: '_blank',
							rel: 'noopener noreferrer',
						},
					},
				},
			},
			image: {
				styles: ['full', 'alignLeft', 'alignCenter', 'alignRight'],
				resizeOptions: [
					{
						name: 'imageResize:original',
						label: 'Original',
						value: null,
					},
					{
						name: 'imageResize:50',
						label: '50%',
						value: '50',
					},
					{
						name: 'imageResize:75',
						label: '75%',
						value: '75',
					},
				],
				toolbar: [
					'imageStyle:full',
					'imageStyle:alignLeft',
					'imageStyle:alignCenter',
					'imageStyle:alignRight',
					'|',
					'imageTextAlternative',
				],
			},
		};

		return (
			<CKEditor
				required
				editor={ClassicEditor}
				config={custom_config}
				data={value}
				onChange={onChange}
			/>
		);
	}
}

function MyCustomUploadAdapterPlugin(editor) {
	editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
		return new MyUploadAdapter(loader);
	};
}

class MyUploadAdapter {
	constructor(props) {
		// CKEditor 5's FileLoader instance.
		this.loader = props;
		// URL where to send files.
		this.url = `/api/v1/images/`;
	}

	// Starts the upload process.
	upload() {
		return new Promise((resolve, reject) => {
			this._initRequest();
			this._initListeners(resolve, reject);
			this._sendRequest();
		});
	}

	// Aborts the upload process.
	abort() {
		if (this.xhr) {
			this.xhr.abort();
		}
	}

	// Example implementation using XMLHttpRequest.
	_initRequest() {
		const xhr = (this.xhr = new XMLHttpRequest());

		xhr.open('POST', this.url, true);
		xhr.responseType = 'json';
		xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
	}

	// Initializes XMLHttpRequest listeners.
	_initListeners(resolve, reject) {
		const xhr = this.xhr;
		const loader = this.loader;
		const genericErrorText = "Couldn't upload file:" + ` ${loader.file.name}.`;

		xhr.addEventListener('error', () => reject(genericErrorText));
		xhr.addEventListener('abort', () => reject());
		xhr.addEventListener('load', () => {
			const response = xhr.response;
			if (!response || response.error) {
				return reject(
					response && response.error ? response.error.message : genericErrorText
				);
			}

			// If the upload is successful, resolve the upload promise with an object containing
			// at least the "default" URL, pointing to the image on the server.
			resolve({
				default: response.data.path,
			});
		});

		if (xhr.upload) {
			xhr.upload.addEventListener('progress', (evt) => {
				if (evt.lengthComputable) {
					loader.uploadTotal = evt.total;
					loader.uploaded = evt.loaded;
				}
			});
		}
	}

	// Prepares the data and sends the request.
	_sendRequest() {
		const data = new FormData();

		this.loader.file.then((result) => {
			data.append('blogImage', result);
			this.xhr.send(data);
		});
	}
}

export default TextEditor;
