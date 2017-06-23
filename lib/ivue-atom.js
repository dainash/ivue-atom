'use babel';

import beautify from '../utils/beautify';
import {CompositeDisposable} from 'atom';

export default {

    ivueAtomView : null,
    modalPanel : null,
    subscriptions : null,

    activate(state) {
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'ivue-atom:format': () => this.format()
        }));
    },

    deactivate() {
        this.modalPanel.destroy();
        this.subscriptions.dispose();
        this.ivueAtomView.destroy();
    },

    serialize() {
        return {ivueAtomViewState: this.ivueAtomView.serialize()};
    },

    format() {
        let editor;
        if (editor = atom.workspace.getActiveTextEditor()) {
            if (!editor.getPath().endsWith('.vue')) {
                return;
            }
            let text = editor.getText();
            let code = beautify(text);
            editor.setText(code);
        }
    }

};
