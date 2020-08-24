import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProcessComponentsPage, ProcessDeleteDialog, ProcessUpdatePage } from './process.page-object';

const expect = chai.expect;

describe('Process e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let processComponentsPage: ProcessComponentsPage;
  let processUpdatePage: ProcessUpdatePage;
  let processDeleteDialog: ProcessDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Processes', async () => {
    await navBarPage.goToEntity('process');
    processComponentsPage = new ProcessComponentsPage();
    await browser.wait(ec.visibilityOf(processComponentsPage.title), 5000);
    expect(await processComponentsPage.getTitle()).to.eq('Processes');
    await browser.wait(ec.or(ec.visibilityOf(processComponentsPage.entities), ec.visibilityOf(processComponentsPage.noResult)), 1000);
  });

  it('should load create Process page', async () => {
    await processComponentsPage.clickOnCreateButton();
    processUpdatePage = new ProcessUpdatePage();
    expect(await processUpdatePage.getPageTitle()).to.eq('Create or edit a Process');
    await processUpdatePage.cancel();
  });

  it('should create and save Processes', async () => {
    const nbButtonsBeforeCreate = await processComponentsPage.countDeleteButtons();

    await processComponentsPage.clickOnCreateButton();

    await promise.all([
      processUpdatePage.setProcessNameInput('processName'),
      processUpdatePage.setDescProcessInput('descProcess'),
      processUpdatePage.applicationSelectLastOption(),
      processUpdatePage.serverSelectLastOption(),
    ]);

    expect(await processUpdatePage.getProcessNameInput()).to.eq('processName', 'Expected ProcessName value to be equals to processName');
    expect(await processUpdatePage.getDescProcessInput()).to.eq('descProcess', 'Expected DescProcess value to be equals to descProcess');

    await processUpdatePage.save();
    expect(await processUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await processComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Process', async () => {
    const nbButtonsBeforeDelete = await processComponentsPage.countDeleteButtons();
    await processComponentsPage.clickOnLastDeleteButton();

    processDeleteDialog = new ProcessDeleteDialog();
    expect(await processDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Process?');
    await processDeleteDialog.clickOnConfirmButton();

    expect(await processComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
