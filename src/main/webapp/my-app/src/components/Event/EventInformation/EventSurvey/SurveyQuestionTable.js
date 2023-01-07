import React, {Component} from 'react';
import {Alert, AlertTitle} from "@material-ui/lab";
import InfoIcon from "@material-ui/icons/Info";
import MaterialTable from 'material-table';
import Typography from '@material-ui/core/Typography';
import { animateScroll } from "react-scroll";
import AnswerOptionsOfQuestion from "./AnswerOptionsOfQuestion";
class SurveyQuestionTable extends Component {

    state = {
        columns: [
            { title: 'Question', field: 'question' }]
        ,
        isShowAnswerOptions : false,
        answerOptions : []
    }

    componentDidMount = () => {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        animateScroll.scrollToBottom({
            table: "options-holder"
        });
    }

    showAnswerOptions = (e,surveyQuestion) => {
        this.setState({
            isShowAnswerOptions : true,
            answerOptions : surveyQuestion.answerOptions
        })
    }

    closeAnswerOptions = () => {
        this.setState({
            isShowAnswerOptions : false,
        })
    }

    render() {
        const {columns} = this.state;
        const {surveyQuestions,onDeleteQuestion} = this.props;

        return (
            <div className={"mt-5"}>
                <Alert severity="info" className={"container mb-5"}>
                    <AlertTitle>Information</AlertTitle>
                    on the left of the question <InfoIcon></InfoIcon>
                    <strong>By pressing the icon, you can view the answer options that can be given to the question.</strong>
                </Alert>
                <MaterialTable columns={columns}
                               id = "table"
                               data={surveyQuestions}
                               className ={"mt-5 mb-5"}
                               title={<Typography variant="h4" component="h5">
                                   List of Survey Questions You've Added
                               </Typography>}
                               actions ={[
                                   {
                                       icon :  'info',
                                       tooltip: 'See answer options',
                                       onClick: (e, rowData,) => this.showAnswerOptions(e,rowData)
                                    },
                                   {
                                       icon :  'delete',
                                       tooltip: 'delete question',
                                       onClick: (e, rowData,) =>
                                           onDeleteQuestion(e,surveyQuestions.indexOf(rowData))
                                   }
                               ]}/>
                {this.state.isShowAnswerOptions ? <AnswerOptionsOfQuestion
                                                    answerOptions = {this.state.answerOptions}
                                                    open = {this.state.isShowAnswerOptions}
                                                    handleClose = {this.closeAnswerOptions}/>: null}
            </div>
        );
    }
}

export default SurveyQuestionTable;