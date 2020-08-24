import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ServerComponentsPage, ServerDeleteDialog, ServerUpdatePage } from './server.page-object';

const expect = chai.expect;

describe('Server e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let serverComponentsPage: ServerComponentsPage;
  let serverUpdatePage: ServerUpdatePage;
  let serverDeleteDialog: ServerDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Servers', async () => {
    await navBarPage.goToEntity('server');
    serverComponentsPage = new ServerComponentsPage();
    await browser.wait(ec.visibilityOf(serverComponentsPage.title), 5000);
    expect(await serverComponentsPage.getTitle()).to.eq('Servers');
    await browser.wait(ec.or(ec.visibilityOf(serverComponentsPage.entities), ec.visibilityOf(serverComponentsPage.noResult)), 1000);
  });

  it('should load create Server page', async () => {
    await serverComponentsPage.clickOnCreateButton();
    serverUpdatePage = new ServerUpdatePage();
    expect(await serverUpdatePage.getPageTitle()).to.eq('Create or edit a Server');
    await serverUpdatePage.cancel();
  });

  it('should create and save Servers', async () => {
    const nbButtonsBeforeCreate = await serverComponentsPage.countDeleteButtons();

    await serverComponentsPage.clickOnCreateButton();

    await promise.all([
      serverUpdatePage.setServerNameInput('serverName'),
      serverUpdatePage.setIpServerInput('ipServer'),
      serverUpdatePage.setOsServerInput('osServer'),
      serverUpdatePage.setLoginInput('login'),
      serverUpdatePage.setPasswordInput('password'),
    ]);

    expect(await serverUpdatePage.getServerNameInput()).to.eq('serverName', 'Expected ServerName value to be equals to serverName');
    expect(await serverUpdatePage.getIpServerInput()).to.eq('ipServer', 'Expected IpServer value to be equals to ipServer');
    expect(await serverUpdatePage.getOsServerInput()).to.eq('osServer', 'Expected OsServer value to be equals to osServer');
    expect(await serverUpdatePage.getLoginInput()).to.eq('login', 'Expected Login value to be equals to login');
    expect(await serverUpdatePage.getPasswordInput()).to.eq('password', 'Expected Password value to be equals to password');

    await serverUpdatePage.save();
    expect(await serverUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await serverComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Server', async () => {
    const nbButtonsBeforeDelete = await serverComponentsPage.countDeleteButtons();
    await serverComponentsPage.clickOnLastDeleteButton();

    serverDeleteDialog = new ServerDeleteDialog();
    expect(await serverDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Server?');
    await serverDeleteDialog.clickOnConfirmButton();

    expect(await serverComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
