import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cloneDeep, find } from 'lodash';
import { DestroyService } from '../../common/services/destroy.service';
import { QuestionService } from '../../common/services/question.service';
import { IQuestion } from '../../common/interfaces/question.interface';
import { AddUpdateQuestionComponent } from '../add-update-question/add-update-question.component';
import { ConfirmationService } from 'primeng/api';
import { IQuestionTypes } from '../../common/interfaces/question-types.interface';

@Component({
    selector: 'app-question-list',
    templateUrl: './question-list.component.html',
    styleUrls: ['./question-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService, ConfirmationService],
})
export class QuestionListComponent implements OnInit {
    surveyId: string;

    questions: IQuestion[];
    selectedQuestions: IQuestion[] = [];
    loading = false;
    errorText = '';
    questionDialog = false;
    @ViewChild('addUpdateQuestionComponent')
    addUpdateQuestionComponent: AddUpdateQuestionComponent;
    question: IQuestion;
    confirmationMessage = '';

    questionTypes: IQuestionTypes[];

    constructor(
        private _cd: ChangeDetectorRef,
        private _destroy$: DestroyService,
        private _questionService: QuestionService,
        private _route: ActivatedRoute,
        private _router: Router,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.surveyId = this._route.snapshot.params.surveyId;
        this.getQuestions();
        this.getQuestionTypes();
    }

    getTableSummary() {
        return `Total ${this.questions ? this.questions.length : 0} ${
            this.questions && this.questions.length > 1
                ? 'Questions'
                : 'Question'
        }`;
    }

    getQuestions() {
        this.loading = true;
        this.errorText = '';
        this._questionService.getQuestionsForSurvey(this.surveyId).subscribe(
            (data) => {
                this.questions = cloneDeep(
                    data.map((e) => {
                        const s: IQuestion = e.payload.doc.data() as IQuestion;
                        s.id = e.payload.doc.id;
                        return s;
                    })
                );
                this.loading = false;
                this._cd.markForCheck();
            },
            (error) => {
                this.errorText = error;
                this.loading = false;
                this._cd.markForCheck();
            }
        );
    }

    getQuestionTypes() {
        this._questionService.getQuestionTypes().subscribe(
            (data) => {
                this.questionTypes = cloneDeep(
                    data.map((e) => {
                        const s: IQuestionTypes = e.payload.doc.data() as IQuestionTypes;
                        return s;
                    })
                );
                this._cd.markForCheck();
            },
            (error) => {
                this.errorText = error;
                this._cd.markForCheck();
            }
        );
    }

    getQuestionTypeLabel(id: number) {
        return find(this.questionTypes, { id })?.label;
    }

    editQuestion(question: IQuestion) {
        this.question = cloneDeep(question);
        this.questionDialog = true;
    }

    deleteQuestion(question: IQuestion) {
        this.confirmationMessage = `Are you sure that you want to delete question?`;
        this.confirmationService.confirm({
            message: this.confirmationMessage,
            accept: () => {
                this.loading = true;
                this.errorText = '';
                this._questionService
                    .deleteQuestion(question.id)
                    .then(() => {
                        this.loading = false;
                        this.getQuestions();
                    })
                    .catch((error) => {
                        this.loading = false;
                        this.errorText = error;
                    });
            },
        });
    }

    addNewQuestion() {
        this.question = null;
        this.questionDialog = true;
    }

    hideDialog() {
        this.question = null;
        this.questionDialog = false;
    }

    saveQuestion() {
        this.loading = true;
        this.errorText = '';
        if (this.question) {
            this._questionService
                .updateQuestion({
                    ...this.addUpdateQuestionComponent.getQuestion,
                    id: this.question.id,
                })
                .then(() => {
                    this.loading = false;
                    this.question = null;
                    this.hideDialog();
                    this.getQuestions();
                    this._cd.markForCheck();
                })
                .catch((error) => {
                    this.addUpdateQuestionComponent.errorText = error;
                    this.loading = false;
                    this._cd.markForCheck();
                });
        } else {
            const question: IQuestion =
                this.addUpdateQuestionComponent.getQuestion;
            question.creationDate = new Date();
            this._questionService
                .saveQuestion(question, this.surveyId)
                .then(() => {
                    this.loading = false;
                    this.hideDialog();
                    this.getQuestions();
                    this._cd.markForCheck();
                })
                .catch((error) => {
                    this.addUpdateQuestionComponent.errorText = error;
                    this.loading = false;
                    this._cd.markForCheck();
                });
        }
    }

    deleteSelectedQuestions() {
        const questionNames: string[] = cloneDeep(this.selectedQuestions).map(
            (item) => item.question
        );
        this.confirmationMessage = `Are you sure that you want to delete ${
            questionNames.length > 1 ? 'questions' : 'question'
        }?`;
        this.confirmationService.confirm({
            message: this.confirmationMessage,
            accept: () => {
                this.selectedQuestions.forEach((value) => {
                    this._questionService
                      .deleteQuestion(value.id)
                      .then(() => {
                          // TODO We need to refresh the grid and unselect header checkbox selection on grid.
                      })
                      .catch((error) => {
                          this.loading = false;
                          this.errorText = error;
                      });
                });
            },
        });
    }
}
