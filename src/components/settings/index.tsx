import React, { Component, ChangeEvent, EventHandler } from "react";
import { ORDER_BY } from "../../types";

import './index.css';

interface ISettingsProps {
    pageCount: number;
    onArticlesCountChange: EventHandler<ChangeEvent>;
    orderBy: ORDER_BY;
    onOrderByChange: EventHandler<ChangeEvent>;
}

export class Settings extends Component<ISettingsProps> {
    public render() {
        return (
            <aside className='settings page__settings'>
                <h2 className='settings__title'>Настройки</h2>
                <section className='settings__section'>
                    <section className='setting page-count-setting settings__setting'>
                        <h3 className='setting__title'>Количество статей:</h3>
                        <input
                            value={this.props.pageCount}
                            onChange={this.props.onArticlesCountChange}
                            type='range'
                            min={5}
                            max={20}
                            step={5}
                        />
                        <span className='page-count-setting__label'>{this.props.pageCount}</span>
                    </section>
                    <section className='setting settings__setting'>
                        <h3 className='setting__title'>Сортировать по:</h3>
                        <select
                            onChange={this.props.onOrderByChange}
                            value={this.props.orderBy}
                        >
                            <option value={ORDER_BY.RELEVANCE}>Релевантности</option>
                            <option value={ORDER_BY.LAST_MODIFIED}>Дате последнего обновления</option>
                        </select>
                    </section>
                </section>
            </aside>
        );
    }
}
