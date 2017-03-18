import CallCenter from './src/call-center';
import Call from './src/call';
import DecisionTree from './src/decision-tree';
import Department from './src/department';
import Question from './src/question';
import Employee from './src/employee';

const callCenter = new CallCenter();

const financeDepartment = new Department('Finance', 1);
const supportDepartment = new Department('Support', 2);

callCenter.addDepartment(financeDepartment);
callCenter.addDepartment(supportDepartment);

const globalDecisionTree = callCenter.getGlobalDepartment().decisionTree;
const financeDecisionTree = financeDepartment.decisionTree;
const supportDecisionTree = supportDepartment.decisionTree;

const questionGlobal1 = new Question({
  name: 'f0',
  statement: 'Finance?',
  redirectOn: 'true',
  redirectTo: 1
});

const questionGlobal2 = new Question({
  name: 's0',
  statement: 'Support?',
  redirectOn: 'true',
  redirectTo: 2
});
globalDecisionTree.addQuestion(questionGlobal1);
globalDecisionTree.addQuestion(questionGlobal2);

const questionFinance1 = new Question({
  name: 'fq1',
  statement: 'Finance question 1',
  scaleOn: 'true'
});

const questionFinance2 = new Question({
  name: 'fq2',
  statement: 'Finance question 2',
  redirectOn: 'true',
  redirectTo: 2
});

financeDecisionTree.addQuestion(questionFinance1);
financeDecisionTree.addQuestion(questionFinance2);

const questionSupport1 = new Question({
  name: 'sq1',
  statement: 'Support question 1',
  redirectOn: 'true',
  redirectTo: 1
});

supportDecisionTree.addQuestion(questionSupport1);

const gateway = new Employee('Gateway', 'Gateway');
const directorFinance = new Employee('Malou', 'Casidi');
const managerFinance = new Employee('Simbad', 'Sailor', directorFinance);
const agentFinance1 = new Employee('Tomas', 'Corral', managerFinance);
const agentFinance2 = new Employee('Guy', 'Rombaut', managerFinance);

const directorSupport = new Employee('Sidney', 'Hoover');
const managerSupport = new Employee('Roger', 'Krump', directorSupport);
const agentSupport1 = new Employee('Marian', 'Zafra', managerSupport);
const agentSupport2 = new Employee('Ricky', 'Martos', managerSupport);

callCenter.getGlobalDepartment().registerEmployee(gateway);
financeDepartment.registerEmployee(directorFinance);
financeDepartment.registerEmployee(managerFinance);
financeDepartment.registerEmployee(agentFinance1);
financeDepartment.registerEmployee(agentFinance2);

supportDepartment.registerEmployee(directorSupport);
supportDepartment.registerEmployee(managerSupport);
supportDepartment.registerEmployee(agentSupport1);
supportDepartment.registerEmployee(agentSupport2);

callCenter.getGlobalDepartment().employees[0].startWorkingDay();
directorFinance.startWorkingDay();
managerFinance.startWorkingDay();
agentFinance1.startWorkingDay();

directorSupport.startWorkingDay();
managerSupport.startWorkingDay();
agentSupport1.startWorkingDay();
agentSupport2.startWorkingDay();

const call = new Call(Math.floor(Math.random() * 999999999));
callCenter.addCall(call);
