describe('Gerenciamento de Perfis no Github', () => {

    beforeEach(() => {
        cy.login()
        cy.goTo('Tabela', 'Perfis do GitHub')
    })

    it('Deve poder cadastrar um novo prefil do github', () => {
        cy.get('#name').type('Abel')
        cy.get('#username').type('papitodev')
        cy.get('#profile').type('QA')

        cy.contains('button', 'Adicionar Perfil').click()

        cy.get('#name').type('Abel')
        cy.get('#username').type('abelkeveen')
        cy.get('#profile').type('QA')

        cy.contains('button', 'Adicionar Perfil').click()

        cy.contains('table tbody tr', 'abelkeveen')
        .should('be.visible')
        .as('trProfile')

        cy.get('@trProfile')
        .contains('td', 'Abel')
        .should('be.visible')

        cy.get('@trProfile')
        .contains('td', 'QA')
        .should('be.visible')
        
    })

    it('Deve poder remover um perfil no github', () => {
        
        const profile = {
            name: 'Abel',
            username: 'abelqa',
            desc: 'QA'
        }

        cy.get('#name').type(profile.name)
        cy.get('#username').type(profile.username)
        cy.get('#profile').type(profile.desc)

        cy.contains('button', 'Adicionar Perfil').click()

        cy.contains('table tbody tr', profile.username)
        .should('be.visible')
        .as('trProfile')

        cy.get('@trProfile').find('button[title="Remover perfil"]').click()
        cy.contains('table tbody', profile.username)
          .should('not.exist')

    })

    it('Deve validar o link do github', () => {
        
        const profile = {
            name: 'Abel',
            username: 'abelkeveen',
            desc: 'QA'
        }

        cy.get('#name').type(profile.name)
        cy.get('#username').type(profile.username)
        cy.get('#profile').type(profile.desc)

        cy.contains('button', 'Adicionar Perfil').click()

        cy.contains('table tbody tr', profile.username)
          .should('be.visible')
          .as('trProfile')

        cy.get('@trProfile').find('a')
          .should('have.attr','href', 'https://github.com/' + profile.username)
          .and('have.attr', 'target', '_blank')

    })
})