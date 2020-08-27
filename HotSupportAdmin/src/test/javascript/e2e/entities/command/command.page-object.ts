import { element, by, ElementFinder } from 'protractor';

export class CommandComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-command div table .btn-danger'));
  title = element.all(by.css('jhi-command div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getText();
  }
}

export class CommandUpdatePage {
  pageTitle = element(by.id('jhi-command-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  commandNameInput = element(by.id('field_commandName'));
  descCommandInput = element(by.id('field_descCommand'));
  forStatusSelect = element(by.id('field_forStatus'));

  actionsSelect = element(by.id('field_actions'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setCommandNameInput(commandName: string): Promise<void> {
    await this.commandNameInput.sendKeys(commandName);
  }

  async getCommandNameInput(): Promise<string> {
    return await this.commandNameInput.getAttribute('value');
  }

  async setDescCommandInput(descCommand: string): Promise<void> {
    await this.descCommandInput.sendKeys(descCommand);
  }

  async getDescCommandInput(): Promise<string> {
    return await this.descCommandInput.getAttribute('value');
  }

  async setForStatusSelect(forStatus: string): Promise<void> {
    await this.forStatusSelect.sendKeys(forStatus);
  }

  async getForStatusSelect(): Promise<string> {
    return await this.forStatusSelect.element(by.css('option:checked')).getText();
  }

  async forStatusSelectLastOption(): Promise<void> {
    await this.forStatusSelect.all(by.tagName('option')).last().click();
  }

  async actionsSelectLastOption(): Promise<void> {
    await this.actionsSelect.all(by.tagName('option')).last().click();
  }

  async actionsSelectOption(option: string): Promise<void> {
    await this.actionsSelect.sendKeys(option);
  }

  getActionsSelect(): ElementFinder {
    return this.actionsSelect;
  }

  async getActionsSelectedOption(): Promise<string> {
    return await this.actionsSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class CommandDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-command-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-command'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
