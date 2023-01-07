import React, {Component} from 'react';
import MaterialTable from 'material-table';
import Typography from '@material-ui/core/Typography';

class QuestionTable extends Component {

    state = {
        columns: [
            { title: 'Question', field: 'question' },
            { title: 'questionType', field: 'questionType'},
            { title: 'Is it mandatory to answer the question ', field: 'isQuestionRequired'},
            {title : 'The smallest value of the expected answer to the question', field : 'expectedMinValueAnswerOfQuestion'},
            {title : 'The greatest value of the expected answer to the question', field : 'expectedMaxValueAnswerOfQuestion'},
        ],
    }

    render() {
        const {columns} = this.state;
        const {questions,onDeleteQuestion} = this.props;
        return (
            <div className={"mt-5"}>
                <MaterialTable columns={columns}
                               data={questions}
                               title={<Typography variant="h4" component="h5">
                                   List of Questions You Have Added
                                     </Typography>}
                               actions ={[{
                                   icon :  'delete',
                                   tooltip: 'delete',
                                   onClick: (e, rowData,) => onDeleteQuestion(e,questions.indexOf(rowData))
                               }]}/>
            </div>
        );
    }
}
export default QuestionTable;