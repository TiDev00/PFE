import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CommandComponentsPage, CommandDeleteDialog, CommandUpdatePage } from './command.page-object';

const expect = chai.expect;

describe('Command e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let commandComponentsPage: CommandComponentsPage;
  let commandUpdatePage: CommandUpdatePage;
  let commandDeleteDialog: CommandDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Commands', async () => {
    await navBarPage.goToEntity('command');
    commandComponentsPage = new CommandComponentsPage();
    await browser.wait(ec.visibilityOf(commandComponentsPage.title), 5000);
    expect(await commandComponentsPage.getTitle()).to.eq('Commands');
    await browser.wait(ec.or(ec.visibilityOf(commandComponentsPage.entities), ec.visibilityOf(commandComponentsPage.noResult)), 1000);
  });

  it('should load create Command page', async () => {
    await commandComponentsPage.clickOnCreateButton();
    commandUpdatePage = new CommandUpdatePage();
    expect(await commandUpdatePage.getPageTitle()).to.eq('Create or edit a Command');
    await commandUpdatePage.cancel();
  });

  it('should create and save Commands', async () => {
    const nbButtonsBeforeCreate = await commandComponentsPage.countDeleteButtons();

    await commandComponentsPage.clickOnCreateButton();

    await promise.all([
      commandUpdatePage.setCommandNameInput('commandName'),
      commandUpdatePage.setDescCommandInput('descCommand'),
      commandUpdatePage.actionsSelectLastOption(),
    ]);

    expect(await commandUpdatePage.getCommandNameInput()).to.eq('commandName', 'Expected CommandName value to be equals to commandName');
    expect(await commandUpdatePage.getDescCommandInput()).to.eq('descCommand', 'Expected DescCommand value to be equals to descCommand');

    await commandUpdatePage.save();
    expect(await commandUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await commandComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Command', async () => {
    const nbButtonsBeforeDelete = await commandComponentsPage.countDeleteButtons();
    await commandComponentsPage.clickOnLastDeleteButton();

    commandDeleteDialog = new CommandDeleteDialog();
    expect(await commandDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Command?');
    await commandDeleteDialog.clickOnConfirmButton();

    expect(await commandComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
