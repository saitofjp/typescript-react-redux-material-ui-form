
import * as React from 'react';
import { Snackbar } from 'material-ui';
import TableExampleControlled from './examples/TableExampleControlled';
import DialogExampleDialogDatePicker from './examples/DialogExampleDialogDatePicker';


export const MaterialUis = () => <div>
    <TableExampleControlled />
    <DialogExampleDialogDatePicker />
    <Snackbar
        open={true}
        message="スナックバーです。Event added to your calendar"
        autoHideDuration={4000}
    />
</div>;