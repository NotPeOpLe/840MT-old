(window.webpackJsonp = window.webpackJsonp || []).push([
    [23], {
        11: function (e, t, s) {
            e.exports = s("1KtZ")
        },
        "1KtZ": function (e, t, s) {
            "use strict";
            s.r(t);
            var r, a, o = s("SYsv"),
                n = s("cDcd"),
                i = s("NzAu"),
                p = {}.hasOwnProperty;
            a = n.createElement, r = "profile-extra-recent-infringements";
            var u, c, l = function (e) {
                    var t;

                    function s() {
                        return s.__super__.constructor.apply(this, arguments)
                    }
                    return function (e, t) {
                        for (var s in t) p.call(t, s) && (e[s] = t[s]);

                        function r() {
                            this.constructor = e
                        }
                        r.prototype = t.prototype, e.prototype = new r, e.__super__ = t.prototype
                    }(s, e), t = ["date", "action", "length", "description"], s.prototype.render = function () {
                        var e, s, n;
                        return null != (n = _.find(this.props.user.account_history, (function (e) {
                            return "silence" === e.type
                        }))) && (s = moment(n.timestamp).add(n.length, "seconds")), Object(i.div)({
                            className: "page-extra"
                        }, a(o.a, {
                            name: this.props.name,
                            withEdit: !1
                        }), null != n ? Object(i.div)({
                            className: "page-extra__alert page-extra__alert--warning"
                        }, Object(i.span)({
                            dangerouslySetInnerHTML: {
                                __html: osu.trans("users.show.extra.account_standing.bad_standing", {
                                    username: this.props.user.username
                                })
                            }
                        })) : void 0, null != n && s.isAfter() ? Object(i.div)({
                            className: "page-extra__alert page-extra__alert--info"
                        }, Object(i.span)({
                            dangerouslySetInnerHTML: {
                                __html: osu.trans("users.show.extra.account_standing.remaining_silence", {
                                    username: this.props.user.username,
                                    duration: osu.timeago(s.format())
                                })
                            }
                        })) : void 0, Object(i.h3)({
                            className: "title title--page-extra-small"
                        }, osu.trans("users.show.extra.account_standing.recent_infringements.title")), Object(i.div)({
                            className: "" + r
                        }, Object(i.table)({
                            className: r + "__table"
                        }, Object(i.thead)({}, Object(i.tr)({}, function () {
                            var s, a, o;
                            for (o = [], s = 0, a = t.length; s < a; s++) e = t[s], o.push(Object(i.th)({
                                key: e,
                                className: r + "__table-cell " + r + "__table-cell--header " + r + "__table-cell--" + e
                            }, osu.trans("users.show.extra.account_standing.recent_infringements." + e)));
                            return o
                        }())), Object(i.tbody)({}, this.table(this.props.user.account_history)))))
                    }, s.prototype.table = function (e) {
                        var t, s, a, o, n;
                        for (n = [], s = a = 0, o = e.length; a < o; s = ++a) t = e[s], n.push(Object(i.tr)({
                            key: s
                        }, Object(i.td)({
                            className: r + "__table-cell " + r + "__table-cell--date"
                        }, Object(i.time)({
                            className: "timeago",
                            dateTime: t.timestamp
                        }, moment(t.timestamp).fromNow())), Object(i.td)({
                            className: r + "__table-cell " + r + "__table-cell--action"
                        }, Object(i.div)({
                            className: r + "__action " + r + "__action--" + t.type
                        }, osu.trans("users.show.extra.account_standing.recent_infringements.actions." + t.type))), Object(i.td)({
                            className: r + "__table-cell " + r + "__table-cell--length"
                        }, "restriction" === t.type ? Object(i.div)({
                            className: r + "__action " + r + "__action--restriction"
                        }, osu.trans("users.show.extra.account_standing.recent_infringements.length_permanent")) : "note" === t.type ? "" : moment.duration(t.length, "seconds").humanize()), Object(i.td)({
                            className: r + "__table-cell " + r + "__table-cell--description"
                        }, Object(i.span)({
                            className: r + "__description"
                        }, currentUser.is_admin && null != t.supporting_url ? Object(i.a)({
                            href: t.supporting_url
                        }, t.description) : t.description, currentUser.is_admin && null != t.actor ? Object(i.span)({
                            className: r + "__actor",
                            dangerouslySetInnerHTML: {
                                __html: osu.trans("users.show.extra.account_standing.recent_infringements.actor", {
                                    username: osu.link(laroute.route("users.show", {
                                        user: t.actor.id
                                    }), t.actor.username)
                                })
                            }
                        }) : void 0))));
                        return n
                    }, s
                }(n.PureComponent),
                h = s("SW8+"),
                d = s("q3z+"),
                m = s("Ncbg"),
                f = function (e, t) {
                    return function () {
                        return e.apply(t, arguments)
                    }
                },
                v = {}.hasOwnProperty;
            u = n.createElement, c = ["favouriteBeatmapsets", "rankedAndApprovedBeatmapsets", "lovedBeatmapsets", "unrankedBeatmapsets", "graveyardBeatmapsets"];
            var y, b = function (e) {
                    function t() {
                        return this.renderBeatmapsets = f(this.renderBeatmapsets, this), this.render = f(this.render, this), t.__super__.constructor.apply(this, arguments)
                    }
                    return function (e, t) {
                        for (var s in t) v.call(t, s) && (e[s] = t[s]);

                        function r() {
                            this.constructor = e
                        }
                        r.prototype = t.prototype, e.prototype = new r, e.__super__ = t.prototype
                    }(t, e), t.prototype.render = function () {
                        return Object(i.div)({
                            className: "page-extra"
                        }, u(o.a, {
                            name: this.props.name,
                            withEdit: this.props.withEdit
                        }), c.map(this.renderBeatmapsets))
                    }, t.prototype.renderBeatmapsets = function (e) {
                        var t, s, r, a;
                        return a = _.replace(_.snakeCase(e), "_beatmapsets", ""), r = this.props.counts[e], s = this.props[e], Object(i.div)({
                            key: e
                        }, Object(i.h3)({
                            className: "title title--page-extra-small"
                        }, osu.trans("users.show.extra.beatmaps." + a + ".title"), " ", r > 0 ? Object(i.span)({
                            className: "title__count"
                        }, osu.formatNumber(r)) : void 0), s.length > 0 ? Object(i.div)({
                            className: "osu-layout__col-container osu-layout__col-container--with-gutter"
                        }, function () {
                            var e, r, a;
                            for (a = [], e = 0, r = s.length; e < r; e++) t = s[e], a.push(Object(i.div)({
                                key: t.id,
                                className: "osu-layout__col osu-layout__col--sm-6"
                            }, u(d.a, {
                                beatmap: t
                            })));
                            return a
                        }(), Object(i.div)({
                            className: "osu-layout__col"
                        }, u(m.a, {
                            modifiers: ["profile-page", "t-greyseafoam-dark"],
                            event: "profile:showMore",
                            hasMore: this.props.pagination[e].hasMore,
                            loading: this.props.pagination[e].loading,
                            data: {
                                name: e,
                                url: laroute.route("users.beatmapsets", {
                                    user: this.props.user.id,
                                    type: a
                                })
                            }
                        }))) : Object(i.p)({
                            className: "page-extra-entries"
                        }, osu.trans("users.show.extra.beatmaps.none")))
                    }, t
                }(n.PureComponent),
                g = s("B+BC"),
                O = function (e, t) {
                    return function () {
                        return e.apply(t, arguments)
                    }
                },
                j = {}.hasOwnProperty,
                w = function (e) {
                    function t() {
                        return this.onMouseEnter = O(this.onMouseEnter, this), this.onClick = O(this.onClick, this), this.render = O(this.render, this), t.__super__.constructor.apply(this, arguments)
                    }
                    return function (e, t) {
                        for (var s in t) j.call(t, s) && (e[s] = t[s]);

                        function r() {
                            this.constructor = e
                        }
                        r.prototype = t.prototype, e.prototype = new r, e.__super__ = t.prototype
                    }(t, e), t.prototype.render = function () {
                        return Object(i.button)({
                            className: osu.classWithModifiers("profile-cover-selection", this.props.modifiers),
                            style: {
                                backgroundImage: osu.urlPresence(this.props.thumbUrl)
                            },
                            onClick: this.onClick,
                            onMouseEnter: this.onMouseEnter,
                            onMouseLeave: this.onMouseLeave
                        }, this.props.isSelected ? Object(i.span)({
                            className: "profile-cover-selection__selected"
                        }, Object(i.span)({
                            className: "far fa-check-circle"
                        })) : void 0)
                    }, t.prototype.onClick = function (e) {
                        if (null != this.props.url) return $.publish("user:cover:upload:state", [!0]), $.ajax(laroute.route("account.cover"), {
                            method: "post",
                            data: {
                                cover_id: this.props.name
                            },
                            dataType: "json"
                        }).always((function () {
                            return $.publish("user:cover:upload:state", [!1])
                        })).done((function (e) {
                            return $.publish("user:update", e)
                        })).fail(osu.emitAjaxError(e.target))
                    }, t.prototype.onMouseEnter = function () {
                        if (null != this.props.url) return $.publish("user:cover:set", this.props.url)
                    }, t.prototype.onMouseLeave = function () {
                        return $.publish("user:cover:reset")
                    }, t
                }(n.PureComponent),
                N = s("mk7q"),
                x = function (e, t) {
                    return function () {
                        return e.apply(t, arguments)
                    }
                },
                k = {}.hasOwnProperty;
            y = n.createElement;
            var P, M = function (e) {
                    function t(e) {
                        this.$uploadButton = x(this.$uploadButton, this), this.render = x(this.render, this), this.componentWillUnmount = x(this.componentWillUnmount, this), this.componentDidMount = x(this.componentDidMount, this), t.__super__.constructor.call(this, e), this.uploadButtonContainer = n.createRef()
                    }
                    return function (e, t) {
                        for (var s in t) k.call(t, s) && (e[s] = t[s]);

                        function r() {
                            this.constructor = e
                        }
                        r.prototype = t.prototype, e.prototype = new r, e.__super__ = t.prototype
                    }(t, e), t.prototype.componentDidMount = function () {
                        var e, t;
                        return e = $(".js-profile-cover-upload--dropzone"), t = $("<input>", {
                            class: "js-profile-cover-upload fileupload__input",
                            type: "file",
                            name: "cover_file",
                            disabled: !this.props.canUpload
                        }), this.uploadButtonContainer.current.appendChild(t[0]), t.fileupload({
                            url: laroute.route("account.cover"),
                            dataType: "json",
                            dropZone: e,
                            submit: function () {
                                return $.publish("user:cover:upload:state", !0), $.publish("dragendGlobal")
                            },
                            done: function (e, t) {
                                return $.publish("user:update", t.result)
                            },
                            fail: osu.fileuploadFailCallback(this.$uploadButton),
                            complete: function () {
                                return $.publish("user:cover:upload:state", !1)
                            }
                        })
                    }, t.prototype.componentWillUnmount = function () {
                        return this.$uploadButton().fileupload("destroy").remove()
                    }, t.prototype.render = function () {
                        var e;
                        return e = "btn-osu btn-osu--small btn-osu-default fileupload profile-cover-uploader__button", this.props.canUpload || (e += " disabled"), Object(i.div)({
                            className: "profile-cover-uploader"
                        }, y(w, {
                            url: this.props.cover.custom_url,
                            thumbUrl: this.props.cover.custom_url,
                            isSelected: null == this.props.cover.id,
                            name: -1,
                            modifiers: ["custom"]
                        }), Object(i.label)({
                            className: e,
                            ref: this.uploadButtonContainer
                        }, osu.trans("users.show.edit.cover.upload.button")), Object(i.div)({
                            className: "profile-cover-uploader__info"
                        }, Object(i.p)({
                            className: "profile-cover-uploader__info-entry"
                        }, Object(i.strong)(null, y(N.a, {
                            mappings: {
                                ":link": Object(i.a)({
                                    href: laroute.route("store.products.show", {
                                        product: "supporter-tag"
                                    }),
                                    key: "link",
                                    target: "_blank"
                                }, osu.trans("users.show.edit.cover.upload.restriction_info.link"))
                            },
                            pattern: osu.trans("users.show.edit.cover.upload.restriction_info._")
                        }))), Object(i.p)({
                            className: "profile-cover-uploader__info-entry"
                        }, osu.trans("users.show.edit.cover.upload.dropzone_info")), Object(i.p)({
                            className: "profile-cover-uploader__info-entry"
                        }, osu.trans("users.show.edit.cover.upload.size_info"))))
                    }, t.prototype.$uploadButton = function () {
                        return $(this.uploadButtonContainer.current).find(".js-profile-cover-upload")
                    }, t
                }(n.Component),
                C = function (e, t) {
                    return function () {
                        return e.apply(t, arguments)
                    }
                },
                S = {}.hasOwnProperty;
            P = n.createElement;
            var E, U = function (e) {
                    function t(e) {
                        this.render = C(this.render, this), this._dropOverlayEnd = C(this._dropOverlayEnd, this), this._dropOverlayStart = C(this._dropOverlayStart, this), this._dropOverlayLeave = C(this._dropOverlayLeave, this), this._dropOverlayEnter = C(this._dropOverlayEnter, this), this.componentWillUnmount = C(this.componentWillUnmount, this), this.componentDidMount = C(this.componentDidMount, this), t.__super__.constructor.call(this, e), this.state = {
                            dropOverlayState: "inactive",
                            dropOverlayVisibility: "hidden"
                        }
                    }
                    return function (e, t) {
                        for (var s in t) S.call(t, s) && (e[s] = t[s]);

                        function r() {
                            this.constructor = e
                        }
                        r.prototype = t.prototype, e.prototype = new r, e.__super__ = t.prototype
                    }(t, e), t.prototype.componentDidMount = function () {
                        return this._removeListeners(), $.subscribe("dragenterGlobal.profilePageCoverSelector", this._dropOverlayStart), $.subscribe("dragendGlobal.profilePageCoverSelector", this._dropOverlayEnd)
                    }, t.prototype.componentWillUnmount = function () {
                        return this._removeListeners()
                    }, t.prototype._dropOverlayEnter = function () {
                        return this.setState({
                            dropOverlayState: "hover"
                        })
                    }, t.prototype._dropOverlayLeave = function () {
                        return this.setState({
                            dropOverlayState: ""
                        })
                    }, t.prototype._dropOverlayStart = function () {
                        return this.setState({
                            dropOverlayVisibility: ""
                        })
                    }, t.prototype._dropOverlayEnd = function () {
                        return this.setState({
                            dropOverlayVisibility: "hidden"
                        })
                    }, t.prototype._removeListeners = function () {
                        return $.unsubscribe(".profilePageCoverSelector")
                    }, t.prototype.render = function () {
                        var e;
                        return Object(i.div)({
                            className: "profile-cover-change-popup js-profile-cover-upload--dropzone"
                        }, Object(i.div)({
                            className: "profile-cover-change-popup__defaults"
                        }, function () {
                            var t, s;
                            for (s = [], e = t = 1; t <= 8; e = ++t) e = e.toString(), s.push(Object(i.div)({
                                className: "profile-cover-change-popup__selection",
                                key: e
                            }, P(w, {
                                name: e,
                                isSelected: this.props.cover.id === e,
                                url: "/images/headers/profile-covers/c" + e + ".jpg",
                                thumbUrl: "/images/headers/profile-covers/c" + e + "t.jpg"
                            })));
                            return s
                        }.call(this), Object(i.p)({
                            className: "profile-cover-change-popup__selections-info"
                        }, osu.trans("users.show.edit.cover.defaults_info"))), P(M, {
                            cover: this.props.cover,
                            canUpload: this.props.canUpload
                        }), this.props.canUpload ? Object(i.div)({
                            className: "profile-cover-change-popup__drop-overlay profile-cover-change-popup__drop-overlay--" + this.state.dropOverlayState,
                            "data-visibility": this.state.dropOverlayVisibility,
                            onDragEnter: this._dropOverlayEnter,
                            onDragLeave: this._dropOverlayLeave
                        }, osu.trans("users.show.edit.cover.upload.dropzone")) : void 0)
                    }, t
                }(n.PureComponent),
                A = s("SwEc"),
                T = s("jbZF"),
                D = s("FVE9"),
                B = s("hc33"),
                L = function (e, t) {
                    return function () {
                        return e.apply(t, arguments)
                    }
                },
                I = {}.hasOwnProperty;
            E = n.createElement;
            var R, H = function (e) {
                    var t;

                    function s(e) {
                        this.updateCurrentUser = L(this.updateCurrentUser, this), this.renderExtraMenu = L(this.renderExtraMenu, this), this.render = L(this.render, this), this.componentWillUnmount = L(this.componentWillUnmount, this), this.componentDidMount = L(this.componentDidMount, this), s.__super__.constructor.call(this, e), this.eventId = "profile-page-" + osu.uuid(), this.state = {
                            currentUser: osu.jsonClone(currentUser)
                        }
                    }
                    return function (e, t) {
                        for (var s in t) I.call(t, s) && (e[s] = t[s]);

                        function r() {
                            this.constructor = e
                        }
                        r.prototype = t.prototype, e.prototype = new r, e.__super__ = t.prototype
                    }(s, e), t = "profile-detail-bar", s.prototype.componentDidMount = function () {
                        return $.subscribe("user:update." + this.eventId, this.updateCurrentUser)
                    }, s.prototype.componentWillUnmount = function () {
                        return $.unsubscribe("." + this.eventId)
                    }, s.prototype.render = function () {
                        var e;
                        return e = null != _.find(this.state.currentUser.blocks, {
                            target_id: this.props.user.id
                        }), Object(i.div)({
                            className: t
                        }, Object(i.div)({
                            className: t + "__page-toggle"
                        }, Object(i.button)({
                            className: "profile-page-toggle",
                            onClick: this.props.toggleExtend,
                            title: osu.trans("common.buttons." + (this.props.expanded ? "collapse" : "expand"))
                        }, this.props.expanded ? Object(i.span)({
                            className: "fas fa-chevron-up"
                        }) : Object(i.span)({
                            className: "fas fa-chevron-down"
                        }))), Object(i.div)({
                            className: t + "__column " + t + "__column--left"
                        }, Object(i.div)({
                            className: t + "__entry"
                        }, E(D.a, {
                            userId: this.props.user.id,
                            showFollowerCounter: !0,
                            followers: this.props.user.follower_count,
                            modifiers: ["profile-page"],
                            alwaysVisible: !0
                        })), this.state.currentUser.id === this.props.user.id || e ? void 0 : Object(i.div)({
                            className: t + "__entry"
                        }, Object(i.a)({
                            className: "user-action-button user-action-button--profile-page",
                            href: laroute.route("messages.users.show", {
                                user: this.props.user.id
                            }),
                            title: osu.trans("users.card.send_message")
                        }, Object(i.i)({
                            className: "fas fa-envelope"
                        }))), this.renderExtraMenu()), Object(i.div)({
                            className: t + "__column " + t + "__column--right"
                        }, this.props.expanded ? Object(i.div)({
                            title: osu.trans("users.show.stats.level_progress"),
                            className: t + "__entry " + t + "__entry--level-progress hidden-xs"
                        }, Object(i.div)({
                            className: "bar bar--user-profile"
                        }, Object(i.div)({
                            className: "bar__fill",
                            style: {
                                width: this.props.stats.level.progress + "%"
                            }
                        }), Object(i.div)({
                            className: "bar__text"
                        }, this.props.stats.level.progress + "%"))) : void 0, Object(i.div)({
                            className: t + "__entry " + (this.props.expanded ? "visible-xs" : "")
                        }, E(A.a, {
                            type: "global",
                            stats: this.props.stats
                        })), Object(i.div)({
                            className: t + "__entry " + (this.props.expanded ? "visible-xs" : "")
                        }, E(A.a, {
                            type: "country",
                            stats: this.props.stats
                        })), Object(i.div)({
                            className: t + "__entry " + t + "__entry--level"
                        }, Object(i.div)({
                            className: t + "__level",
                            title: osu.trans("users.show.stats.level", {
                                level: this.props.stats.level.current
                            })
                        }, this.props.stats.level.current))))
                    }, s.prototype.renderExtraMenu = function () {
                        var e, s, r;
                        return s = [], null != this.state.currentUser.id && this.state.currentUser.id !== this.props.user.id && (e = E(T.a, {
                            key: "block",
                            userId: this.props.user.id,
                            wrapperClass: "simple-menu__item",
                            modifiers: ["inline"]
                        }), s.push(e), r = E(B.a, {
                            className: "simple-menu__item",
                            icon: !0,
                            key: "report",
                            reportableId: this.props.user.id,
                            reportableType: "user",
                            user: this.props.user
                        }), s.push(r)), 0 === s.length ? null : Object(i.div)({
                            className: t + "__entry"
                        }, Object(i.button)({
                            className: "profile-page-toggle js-click-menu",
                            title: osu.trans("common.buttons.show_more_options"),
                            "data-click-menu-target": "profile-page-bar-" + this.id
                        }, Object(i.span)({
                            className: "fas fa-ellipsis-v"
                        })), Object(i.div)({
                            className: "simple-menu simple-menu--profile-page-bar js-click-menu",
                            "data-click-menu-id": "profile-page-bar-" + this.id,
                            "data-visibility": "hidden"
                        }, s))
                    }, s.prototype.updateCurrentUser = function (e, t) {
                        if (this.state.currentUser.id === t.id) return this.setState({
                            currentUser: osu.jsonClone(t)
                        })
                    }, s
                }(n.PureComponent),
                W = s("+FrL");
            R = n.createElement;
            var F, z = function (e) {
                var t;
                return t = e.userAchievements, R(W.a, {
                    modifiers: ["medals"],
                    label: osu.trans("users.show.stats.medals"),
                    value: t.length
                })
            };
            F = n.createElement;
            var J, V = function (e) {
                var t, s, r, a, o, n, p, u, c, l;
                return o = e.stats, a = moment.duration(o.play_time, "seconds"), t = Math.floor(a.asDays()), s = a.hours(), r = (l = Math.floor(a.asMinutes())) % 60, u = "hours", (c = Math.round(a.asHours())) < 2 && (c = l, u = "minutes"), p = osu.transChoice("common.count." + u, c), n = "", t > 0 && (n = osu.formatNumber(t) + "d "), n += s + "h " + r + "m", F(W.a, {
                    label: osu.trans("users.show.stats.play_time"),
                    value: Object(i.span)({
                        title: p,
                        "data-tooltip-position": "bottom center"
                    }, n)
                })
            };
            J = n.createElement;
            var K, q = function (e) {
                    var t;
                    return t = e.stats, J(W.a, {
                        modifiers: ["pp"],
                        label: "pp",
                        value: osu.formatNumber(Math.round(t.pp))
                    })
                },
                Y = function (e, t) {
                    return function () {
                        return e.apply(t, arguments)
                    }
                },
                G = {}.hasOwnProperty,
                Z = function (e) {
                    function t(e) {
                        this.rankChartUpdate = Y(this.rankChartUpdate, this), this.render = Y(this.render, this), this.componentWillUnmount = Y(this.componentWillUnmount, this), this.componentDidUpdate = Y(this.componentDidUpdate, this), this.componentDidMount = Y(this.componentDidMount, this), t.__super__.constructor.call(this, e), this.id = "rank-chart-" + osu.uuid, this.rankChartArea = n.createRef(), this.state = {}
                    }
                    return function (e, t) {
                        for (var s in t) G.call(t, s) && (e[s] = t[s]);

                        function r() {
                            this.constructor = e
                        }
                        r.prototype = t.prototype, e.prototype = new r, e.__super__ = t.prototype
                    }(t, e), t.prototype.componentDidMount = function () {
                        return this.rankChartUpdate()
                    }, t.prototype.componentDidUpdate = function () {
                        return this.rankChartUpdate()
                    }, t.prototype.componentWillUnmount = function () {
                        return $(window).off("." + this.id), $.unsubscribe("." + this.id)
                    }, t.prototype.formatX = function (e) {
                        return 0 === e ? osu.trans("common.time.now") : osu.transChoice("common.time.days_ago", -e)
                    }, t.prototype.formatY = function (e) {
                        return "<strong>" + osu.trans("users.show.rank.global_simple") + "</strong> #" + osu.formatNumber(-e)
                    }, t.prototype.render = function () {
                        return Object(i.div)({
                            className: "u-full-size",
                            ref: this.rankChartArea
                        })
                    }, t.prototype.rankChartUpdate = function () {
                        var e, t, s, r;
                        if (null == this.rankChart && (s = {
                                modifiers: ["profile-page"],
                                axisLabels: !1,
                                circleLine: !0,
                                scales: {
                                    x: d3.scaleLinear(),
                                    y: d3.scaleLog()
                                },
                                margins: {
                                    top: 15,
                                    right: 15,
                                    bottom: 15,
                                    left: 15
                                },
                                infoBoxFormats: {
                                    x: this.formatX,
                                    y: this.formatY
                                }
                            }, this.rankChart = new LineChart(this.rankChartArea.current, s), $(window).on("throttled-resize." + this.id, this.rankChart.resize)), this.props.stats.is_ranked && (e = null != (r = this.props.rankHistory) ? r.data : void 0), (e = (null != e ? e : []).map((function (t, s) {
                                return {
                                    x: s - e.length + 1,
                                    y: -t
                                }
                            })).filter((function (e) {
                                return e.y < 0
                            }))).length > 0) return 1 === e.length && e.unshift({
                            x: e[0].x - 1,
                            y: e[0].y
                        }), 0 === (t = _.last(e)).x ? t.y = -this.props.stats.rank.global : e.push({
                            x: 0,
                            y: -this.props.stats.rank.global
                        }), this.rankChart.loadData(e)
                    }, t
                }(n.Component),
                X = function (e, t) {
                    return function () {
                        return e.apply(t, arguments)
                    }
                },
                Q = {}.hasOwnProperty;
            n.createElement, K = {
                XH: "ssh",
                X: "ss",
                SH: "sh",
                S: "s",
                A: "a"
            };
            var ee, te = function (e) {
                    function t() {
                        return this.renderRankCountEntry = X(this.renderRankCountEntry, this), this.render = X(this.render, this), t.__super__.constructor.apply(this, arguments)
                    }
                    return function (e, t) {
                        for (var s in t) Q.call(t, s) && (e[s] = t[s]);

                        function r() {
                            this.constructor = e
                        }
                        r.prototype = t.prototype, e.prototype = new r, e.__super__ = t.prototype
                    }(t, e), t.prototype.render = function () {
                        var e, t;
                        return Object(i.div)({
                            className: "profile-rank-count"
                        }, function () {
                            var s;
                            for (t in s = [], K) e = K[t], s.push(this.renderRankCountEntry(t, e));
                            return s
                        }.call(this))
                    }, t.prototype.renderRankCountEntry = function (e, t) {
                        return Object(i.div)({
                            key: e,
                            className: "profile-rank-count__item"
                        }, Object(i.div)({
                            className: "score-rank score-rank--" + e + " score-rank--profile-page"
                        }), osu.formatNumber(this.props.stats.grade_counts[t]))
                    }, t
                }(n.PureComponent),
                se = function (e, t) {
                    return function () {
                        return e.apply(t, arguments)
                    }
                },
                re = {}.hasOwnProperty;
            ee = n.createElement;
            var ae, oe = function (e) {
                    function t(e) {
                        this.toggleExtend = se(this.toggleExtend, this), this.render = se(this.render, this), t.__super__.constructor.call(this, e), this.state = {
                            expanded: null == currentUser.id || currentUser.user_preferences.ranking_expanded
                        }
                    }
                    return function (e, t) {
                        for (var s in t) re.call(t, s) && (e[s] = t[s]);

                        function r() {
                            this.constructor = e
                        }
                        r.prototype = t.prototype, e.prototype = new r, e.__super__ = t.prototype
                    }(t, e), t.prototype.render = function () {
                        return Object(i.div)({
                            className: "profile-detail"
                        }, Object(i.div)({
                            className: "profile-detail__bar"
                        }, ee(H, {
                            stats: this.props.stats,
                            toggleExtend: this.toggleExtend,
                            expanded: this.state.expanded,
                            user: this.props.user
                        })), Object(i.div)({
                            className: this.state.expanded ? "" : "hidden"
                        }, Object(i.div)({
                            className: "profile-detail__row profile-detail__row--top"
                        }, Object(i.div)({
                            className: "profile-detail__col profile-detail__col--top-left"
                        }, Object(i.div)({
                            className: "profile-detail__top-left-item"
                        }, ee(V, {
                            stats: this.props.stats
                        })), Object(i.div)({
                            className: "profile-detail__top-left-item"
                        }, ee(z, {
                            userAchievements: this.props.userAchievements
                        })), Object(i.div)({
                            className: "profile-detail__top-left-item"
                        }, ee(q, {
                            stats: this.props.stats
                        }))), Object(i.div)({
                            className: "profile-detail__col"
                        }, ee(te, {
                            stats: this.props.stats
                        }))), Object(i.div)({
                            className: "profile-detail__row"
                        }, Object(i.div)({
                            className: "profile-detail__col profile-detail__col--bottom-left"
                        }, this.props.stats.is_ranked ? ee(Z, {
                            rankHistory: this.props.user.rankHistory,
                            stats: this.props.stats
                        }) : Object(i.div)({
                            className: "profile-detail__empty-chart"
                        }, osu.trans("users.show.extra.unranked"))), Object(i.div)({
                            className: "profile-detail__col profile-detail__col--bottom-right"
                        }, Object(i.div)({
                            className: "profile-detail__bottom-right-item"
                        }, ee(A.a, {
                            modifiers: ["large"],
                            type: "global",
                            stats: this.props.stats
                        })), Object(i.div)({
                            className: "profile-detail__bottom-right-item"
                        }, ee(A.a, {
                            type: "country",
                            stats: this.props.stats
                        }))))))
                    }, t.prototype.toggleExtend = function () {
                        return null != currentUser.id && $.ajax(laroute.route("account.options"), {
                            method: "put",
                            dataType: "json",
                            data: {
                                user_profile_customization: {
                                    ranking_expanded: !this.state.expanded
                                }
                            }
                        }), this.setState({
                            expanded: !this.state.expanded
                        })
                    }, t
                }(n.PureComponent),
                ne = function (e, t) {
                    return function () {
                        return e.apply(t, arguments)
                    }
                },
                ie = {}.hasOwnProperty;
            ae = n.createElement;
            var pe = function (e) {
                    function t() {
                        return this.render = ne(this.render, this), t.__super__.constructor.apply(this, arguments)
                    }
                    return function (e, t) {
                        for (var s in t) ie.call(t, s) && (e[s] = t[s]);

                        function r() {
                            this.constructor = e
                        }
                        r.prototype = t.prototype, e.prototype = new r, e.__super__ = t.prototype
                    }(t, e), t.prototype.render = function () {
                        return Object(i.div)({
                            className: "profile-detail-mobile"
                        }, this.props.stats.is_ranked ? Object(i.div)({
                            className: "profile-detail-mobile__item profile-detail-mobile__item--rank-chart"
                        }, ae(Z, {
                            rankHistory: this.props.rankHistory,
                            stats: this.props.stats
                        })) : void 0, Object(i.div)({
                            className: "profile-detail-mobile__item"
                        }, ae(A.a, {
                            type: "global",
                            stats: this.props.stats
                        })), Object(i.div)({
                            className: "profile-detail-mobile__item"
                        }, ae(A.a, {
                            type: "country",
                            stats: this.props.stats
                        })), Object(i.div)({
                            className: "profile-detail-mobile__item"
                        }, ae(V, {
                            stats: this.props.stats
                        })), Object(i.div)({
                            className: "profile-detail-mobile__item profile-detail-mobile__item--half"
                        }, ae(z, {
                            userAchievements: this.props.userAchievements
                        })), Object(i.div)({
                            className: "profile-detail-mobile__item profile-detail-mobile__item--half"
                        }, ae(q, {
                            stats: this.props.stats
                        })))
                    }, t
                }(n.PureComponent),
                ue = function (e, t) {
                    return function () {
                        return e.apply(t, arguments)
                    }
                },
                ce = {}.hasOwnProperty;
            n.createElement;
            var le = function (e) {
                    function t(e) {
                        this.setDefault = ue(this.setDefault, this), this.renderSetDefault = ue(this.renderSetDefault, this), this.render = ue(this.render, this), this.componentWillUnmount = ue(this.componentWillUnmount, this), t.__super__.constructor.call(this, e), this.state = {
                            settingDefault: !1
                        }
                    }
                    return function (e, t) {
                        for (var s in t) ce.call(t, s) && (e[s] = t[s]);

                        function r() {
                            this.constructor = e
                        }
                        r.prototype = t.prototype, e.prototype = new r, e.__super__ = t.prototype
                    }(t, e), t.prototype.componentWillUnmount = function () {
                        var e;
                        return null != (e = this.xhr) ? e.abort() : void 0
                    }, t.prototype.render = function () {
                        var e, t;
                        return this.props.user.is_bot ? null : Object(i.div)({
                            className: "game-mode"
                        }, this.renderSetDefault(), Object(i.ul)({
                            className: "game-mode__items"
                        }, function () {
                            var s, r, a, o;
                            for (o = [], s = 0, r = (a = BeatmapHelper.modes).length; s < r; s++) t = a[s], e = "game-mode-link", t === this.props.currentMode && (e += " game-mode-link--active"), o.push(Object(i.li)({
                                className: "game-mode__item",
                                key: t
                            }, Object(i.a)({
                                className: e,
                                href: laroute.route("users.show", {
                                    user: this.props.user.id,
                                    mode: t
                                })
                            }, osu.trans("beatmaps.mode." + t), this.props.user.playmode === t ? Object(i.span)({
                                className: "game-mode-link__icon",
                                title: osu.trans("users.show.edit.default_playmode.is_default_tooltip")
                            }, " ", Object(i.span)({
                                className: "fas fa-star"
                            })) : void 0)));
                            return o
                        }.call(this)))
                    }, t.prototype.renderSetDefault = function () {
                        if (this.props.withEdit && this.props.user.playmode !== this.props.currentMode) return Object(i.div)({
                            className: "game-mode__set-default hidden-xs"
                        }, Object(i.button)({
                            className: "profile-page-button",
                            disabled: this.state.settingDefault,
                            type: "button",
                            onClick: this.setDefault,
                            dangerouslySetInnerHTML: {
                                __html: osu.trans("users.show.edit.default_playmode.set", {
                                    mode: "<strong>" + osu.trans("beatmaps.mode." + this.props.currentMode) + "</strong>"
                                })
                            }
                        }))
                    }, t.prototype.setDefault = function () {
                        return this.setState({
                            settingDefault: !0
                        }), this.xhr = $.ajax(laroute.route("account.update"), {
                            method: "PUT",
                            data: {
                                user: {
                                    playmode: this.props.currentMode
                                }
                            }
                        }).done((function (e) {
                            return $.publish("user:update", e)
                        })).fail((function (e, t) {
                            if ("abort" !== t) return osu.emitAjaxError()(e)
                        })).always((e = this, function () {
                            return e.setState({
                                settingDefault: !1
                            })
                        }));
                        var e
                    }, t
                }(n.PureComponent),
                he = s("Ev30"),
                de = s("TGI5"),
                me = function (e, t) {
                    return function () {
                        return e.apply(t, arguments)
                    }
                },
                _e = {}.hasOwnProperty;
            n.createElement;
            var fe = function (e) {
                    var t;

                    function s() {
                        return this.formatValue = me(this.formatValue, this), this.renderEntry = me(this.renderEntry, this), this.render = me(this.render, this), s.__super__.constructor.apply(this, arguments)
                    }
                    return function (e, t) {
                        for (var s in t) _e.call(t, s) && (e[s] = t[s]);

                        function r() {
                            this.constructor = e
                        }
                        r.prototype = t.prototype, e.prototype = new r, e.__super__ = t.prototype
                    }(s, e), t = ["ranked_score", "hit_accuracy", "play_count", "total_score", "total_hits", "maximum_combo", "replays_watched_by_others"], s.prototype.render = function () {
                        return Object(i.div)({
                            className: "profile-stats"
                        }, t.map(this.renderEntry))
                    }, s.prototype.renderEntry = function (e) {
                        return Object(i.dl)({
                            className: "profile-stats__entry",
                            key: e
                        }, Object(i.dt)({
                            className: "profile-stats__key"
                        }, osu.trans("users.show.stats." + e)), Object(i.dd)({
                            className: "profile-stats__value"
                        }, this.formatValue(e)))
                    }, s.prototype.formatValue = function (e) {
                        var t;
                        switch (t = this.props.stats[e], e) {
                            case "hit_accuracy":
                                return osu.formatNumber(t, 2) + "%";
                            default:
                                return osu.formatNumber(t)
                        }
                    }, s
                }(n.PureComponent),
                ve = s("qpPZ"),
                ye = s("NW+U");

            function be({
                user: e
            }) {
                return n.createElement("div", {
                    className: "profile-detail"
                }, n.createElement("div", {
                    className: "profile-detail__bar"
                }, n.createElement("div", {
                    className: "profile-detail-bar"
                }, n.createElement("div", {
                    className: "profile-detail-bar__column profile-detail-bar__column--left"
                }, n.createElement("div", {
                    className: "profile-detail-bar__menu-item"
                }, n.createElement(D.a, {
                    alwaysVisible: !0,
                    followers: e.follower_count,
                    modifiers: ["profile-page"],
                    showFollowerCounter: !0,
                    userId: e.id
                }))))))
            }
            s("SYfz");
            var ge, Oe = function (e, t) {
                    return function () {
                        return e.apply(t, arguments)
                    }
                },
                je = {}.hasOwnProperty;
            ge = n.createElement;
            var we = function (e) {
                    function t(e) {
                        this.setDefaultMode = Oe(this.setDefaultMode, this), this.toggleEdit = Oe(this.toggleEdit, this), this.openEdit = Oe(this.openEdit, this), this.headerLinks = Oe(this.headerLinks, this), this.coverUploadState = Oe(this.coverUploadState, this), this.coverSet = Oe(this.coverSet, this), this.coverReset = Oe(this.coverReset, this), this.closeEdit = Oe(this.closeEdit, this), this.renderTournamentBanner = Oe(this.renderTournamentBanner, this), this.renderCoverSelector = Oe(this.renderCoverSelector, this), this.render = Oe(this.render, this), this.componentWillUnmount = Oe(this.componentWillUnmount, this), this.componentWillReceiveProps = Oe(this.componentWillReceiveProps, this), this.componentDidMount = Oe(this.componentDidMount, this), t.__super__.constructor.call(this, e), this.state = {
                            editing: !1,
                            coverUrl: e.user.cover_url,
                            isCoverUpdating: !1,
                            settingDefaultMode: !1
                        }, this.coverSelector = n.createRef(), this.debouncedCoverSet = _.debounce(this.coverSet, 300)
                    }
                    return function (e, t) {
                        for (var s in t) je.call(t, s) && (e[s] = t[s]);

                        function r() {
                            this.constructor = e
                        }
                        r.prototype = t.prototype, e.prototype = new r, e.__super__ = t.prototype
                    }(t, e), t.prototype.componentDidMount = function () {
                        return $.subscribe("user:cover:reset.profilePageHeaderMain", this.coverReset), $.subscribe("user:cover:set.profilePageHeaderMain", this.debouncedCoverSet), $.subscribe("user:cover:upload:state.profilePageHeaderMain", this.coverUploadState), $.subscribe("key:esc.profilePageHeaderMain", this.closeEdit), $(document).on("click.profilePageHeaderMain", this.closeEdit)
                    }, t.prototype.componentWillReceiveProps = function (e) {
                        return this.debouncedCoverSet(null, e.user.cover.url)
                    }, t.prototype.componentWillUnmount = function () {
                        var e;
                        return $.unsubscribe(".profilePageHeaderMain"), $(document).off(".profilePageHeaderMain"), this.closeEdit(), this.debouncedCoverSet.cancel(), null != (e = this.xhr) ? e.abort() : void 0
                    }, t.prototype.render = function () {
                        return Object(i.div)({
                            className: "js-switchable-mode-page--scrollspy js-switchable-mode-page--page",
                            "data-page-id": "main"
                        }, ge(ve.a, {
                            backgroundImage: this.state.coverUrl,
                            isCoverUpdating: this.state.isCoverUpdating,
                            links: this.headerLinks(),
                            theme: "users",
                            contentPrepend: this.renderTournamentBanner(),
                            titleAppend: ge(le, {
                                currentMode: this.props.currentMode,
                                user: this.props.user,
                                withEdit: this.props.withEdit
                            })
                        }), Object(i.div)({
                            className: "osu-page osu-page--users"
                        }, Object(i.div)({
                            className: "profile-header"
                        }, Object(i.div)({
                            className: "profile-header__top"
                        }, ge(he.a, {
                            user: this.props.user,
                            currentMode: this.props.currentMode,
                            coverUrl: this.state.coverUrl
                        }), this.props.user.is_bot ? void 0 : ge(n.Fragment, null, ge(pe, {
                            stats: this.props.stats,
                            userAchievements: this.props.userAchievements,
                            rankHistory: this.props.user.rankHistory
                        }), ge(fe, {
                            stats: this.props.stats
                        }))), this.props.user.is_bot ? ge(be, {
                            user: this.props.user
                        }) : ge(oe, {
                            stats: this.props.stats,
                            userAchievements: this.props.userAchievements,
                            user: this.props.user
                        }), this.props.user.badges.length > 0 ? ge(g.a, {
                            badges: this.props.user.badges
                        }) : void 0, ge(de.a, {
                            user: this.props.user
                        }), this.renderCoverSelector())))
                    }, t.prototype.renderCoverSelector = function () {
                        if (this.props.withEdit) return Object(i.div)({
                            ref: this.coverSelector,
                            className: "profile-header__cover-editor"
                        }, Object(i.button)({
                            className: "profile-page-toggle",
                            title: osu.trans("users.show.edit.cover.button"),
                            onClick: this.toggleEdit
                        }, Object(i.span)({
                            className: "fas fa-pencil-alt"
                        })), this.state.editing ? ge(U, {
                            canUpload: this.props.user.is_supporter,
                            cover: this.props.user.cover
                        }) : void 0)
                    }, t.prototype.renderTournamentBanner = function (e) {
                        var t;
                        if (t = (null != e ? e : {}).modifiers, null != this.props.user.active_tournament_banner.id) return Object(i.a)({
                            href: laroute.route("tournaments.show", {
                                tournament: this.props.user.active_tournament_banner.tournament_id
                            }),
                            className: osu.classWithModifiers("profile-tournament-banner", t)
                        }, ge(ye.a, {
                            src: this.props.user.active_tournament_banner.image,
                            className: "profile-tournament-banner__image"
                        }))
                    }, t.prototype.closeEdit = function (e) {
                        if (this.state.editing) {
                            if (null != e) {
                                if (0 !== e.button) return;
                                if ($(e.target).closest(this.coverSelector.current).length) return
                            }
                            if (!$("#overlay").is(":visible") && !document.body.classList.contains("modal-open")) return this.setState({
                                editing: !1
                            }, this.coverReset)
                        }
                    }, t.prototype.coverReset = function () {
                        return this.debouncedCoverSet(null, this.props.user.cover.url)
                    }, t.prototype.coverSet = function (e, t) {
                        if (!this.state.isCoverUpdating) return this.setState({
                            coverUrl: t
                        })
                    }, t.prototype.coverUploadState = function (e, t) {
                        return this.setState({
                            isCoverUpdating: t
                        })
                    }, t.prototype.headerLinks = function () {
                        var e;
                        return e = [{
                            url: laroute.route("users.show", {
                                user: this.props.user.id
                            }),
                            active: !0,
                            title: osu.trans("layout.header.users.show")
                        }], this.props.user.is_bot || e.push({
                            url: laroute.route("users.modding.index", {
                                user: this.props.user.id
                            }),
                            title: osu.trans("layout.header.users.modding")
                        }), e
                    }, t.prototype.openEdit = function () {
                        return this.setState({
                            editing: !0
                        })
                    }, t.prototype.toggleEdit = function () {
                        return this.state.editing ? this.closeEdit() : this.openEdit()
                    }, t.prototype.setDefaultMode = function () {
                        return this.setState({
                            settingDefaultMode: !0
                        }), this.xhr = $.ajax(laroute.route("account.update"), {
                            method: "PUT",
                            data: {
                                user: {
                                    playmode: this.props.currentMode
                                }
                            }
                        }).done((function (e) {
                            return $.publish("user:update", e)
                        })).fail((function (e, t) {
                            if ("abort" !== t) return osu.emitAjaxError()(e)
                        })).always((e = this, function () {
                            return e.setState({
                                settingDefaultMode: !1
                            })
                        }));
                        var e
                    }, t
                }(n.Component),
                Ne = function (e, t) {
                    return function () {
                        return e.apply(t, arguments)
                    }
                },
                xe = {}.hasOwnProperty;
            n.createElement;
            var ke, Pe = function (e) {
                    function t() {
                        return this.renderPlaycountText = Ne(this.renderPlaycountText, this), this.render = Ne(this.render, this), t.__super__.constructor.apply(this, arguments)
                    }
                    return function (e, t) {
                        for (var s in t) xe.call(t, s) && (e[s] = t[s]);

                        function r() {
                            this.constructor = e
                        }
                        r.prototype = t.prototype, e.prototype = new r, e.__super__ = t.prototype
                    }(t, e), t.prototype.render = function () {
                        var e, t, s;
                        return e = this.props.playcount.beatmap, s = this.props.playcount.beatmapset, t = laroute.route("beatmaps.show", {
                            beatmap: e.id,
                            mode: this.props.currentMode
                        }), Object(i.div)({
                            className: "beatmap-playcount"
                        }, Object(i.a)({
                            href: t,
                            className: "beatmap-playcount__cover",
                            style: {
                                backgroundImage: osu.urlPresence(s.covers.list)
                            }
                        }, Object(i.div)({
                            className: "beatmap-playcount__cover-count"
                        }, this.renderPlaycountText())), Object(i.div)({
                            className: "beatmap-playcount__detail"
                        }, Object(i.div)({
                            className: "beatmap-playcount__info"
                        }, Object(i.div)({
                            className: "beatmap-playcount__info-row u-ellipsis-overflow"
                        }, Object(i.a)({
                            className: "beatmap-playcount__title",
                            href: t
                        }, s.title + " [" + e.version + "] ", Object(i.span)({
                            className: "beatmap-playcount__title-artist"
                        }, osu.trans("users.show.extra.beatmaps.by_artist", {
                            artist: s.artist
                        })))), Object(i.div)({
                            className: "beatmap-playcount__info-row u-ellipsis-overflow"
                        }, Object(i.span)({
                            className: "beatmap-playcount__artist",
                            dangerouslySetInnerHTML: {
                                __html: osu.trans("users.show.extra.beatmaps.by_artist", {
                                    artist: "<strong>" + _.escape(s.artist) + "</strong>"
                                })
                            }
                        }), " ", Object(i.span)({
                            className: "beatmap-playcount__mapper",
                            dangerouslySetInnerHTML: {
                                __html: osu.trans("beatmapsets.show.details.mapped_by", {
                                    mapper: laroute.link_to_route("users.show", s.creator, {
                                        user: s.user_id
                                    }, {
                                        class: "beatmap-playcount__mapper-link js-usercard",
                                        "data-user-id": s.user_id
                                    })
                                })
                            }
                        }))), Object(i.div)({
                            className: "beatmap-playcount__detail-count"
                        }, this.renderPlaycountText())))
                    }, t.prototype.renderPlaycountText = function () {
                        return Object(i.div)({
                            title: osu.trans("users.show.extra.historical.most_played.count"),
                            className: "beatmap-playcount__count"
                        }, Object(i.span)({
                            className: "beatmap-playcount__count-icon"
                        }, Object(i.span)({
                            className: "fas fa-play"
                        })), osu.formatNumber(this.props.playcount.count))
                    }, t
                }(n.PureComponent),
                Me = s("De3I"),
                Ce = s("FAY1"),
                Se = s("AUlK"),
                Ee = function (e, t) {
                    return function () {
                        return e.apply(t, arguments)
                    }
                },
                Ue = {}.hasOwnProperty;
            ke = window.osu;
            var Ae, Te = function (e) {
                    function t(e) {
                        this.toggleCompact = Ee(this.toggleCompact, this), this.render = Ee(this.render, this), t.__super__.constructor.call(this, e), this.state = {
                            compact: !0
                        }
                    }
                    return function (e, t) {
                        for (var s in t) Ue.call(t, s) && (e[s] = t[s]);

                        function r() {
                            this.constructor = e
                        }
                        r.prototype = t.prototype, e.prototype = new r, e.__super__ = t.prototype
                    }(t, e), t.prototype.render = function () {
                        var e, t, s;
                        return s = this.props.score, e = "play-detail", this.props.activated ? e += " play-detail--active" : e += " play-detail--highlightable", this.state.compact && (e += " play-detail--compact"), Object(i.div)({
                            className: e
                        }, Object(i.div)({
                            className: "play-detail__group play-detail__group--top"
                        }, Object(i.div)({
                            className: "play-detail__icon play-detail__icon--main"
                        }, Object(i.div)({
                            className: "score-rank score-rank--full score-rank--" + s.rank
                        })), Object(i.div)({
                            className: "play-detail__detail"
                        }, Object(i.a)({
                            href: laroute.route("beatmaps.show", {
                                beatmap: s.beatmap.id,
                                mode: s.mode
                            }),
                            className: "play-detail__title u-ellipsis-overflow"
                        }, s.beatmapset.title, " ", Object(i.small)({
                            className: "play-detail__artist"
                        }, ke.trans("users.show.extra.beatmaps.by_artist", {
                            artist: s.beatmapset.artist
                        }))), Object(i.div)({
                            className: "play-detail__beatmap-and-time"
                        }, Object(i.span)({
                            className: "play-detail__beatmap"
                        }, s.beatmap.version), Object(i.span)({
                            className: "play-detail__time",
                            dangerouslySetInnerHTML: {
                                __html: ke.timeago(s.created_at)
                            }
                        }))), Object(i.button)({
                            className: "play-detail__compact-toggle",
                            onClick: this.toggleCompact
                        }, Object(i.span)({
                            className: "fas " + (this.state.compact ? "fa-chevron-down" : "fa-chevron-up")
                        }))), Object(i.div)({
                            className: "play-detail__group play-detail__group--bottom"
                        }, Object(i.div)({
                            className: "play-detail__score-detail play-detail__score-detail--score"
                        }, Object(i.div)({
                            className: "play-detail__icon play-detail__icon--extra"
                        }, Object(i.div)({
                            className: "score-rank score-rank--full score-rank--" + s.rank
                        })), Object(i.div)({
                            className: "play-detail__score-detail-top-right"
                        }, Object(i.div)({
                            className: "play-detail__accuracy-and-weighted-pp"
                        }, Object(i.span)({
                            className: "play-detail__accuracy"
                        }, ke.formatNumber(100 * s.accuracy, 2) + "%"), null != s.weight ? Object(i.span)({
                            className: "play-detail__weighted-pp"
                        }, ke.formatNumber(Math.round(s.weight.pp)), "pp") : void 0), null != s.weight ? Object(i.div)({
                            className: "play-detail__pp-weight"
                        }, ke.trans("users.show.extra.top_ranks.pp_weight", {
                            percentage: ke.formatNumber(Math.round(s.weight.percentage)) + "%"
                        })) : void 0)), Object(i.div)({
                            className: "play-detail__score-detail play-detail__score-detail--mods"
                        }, Object(n.createElement)(Me.a, {
                            mods: s.mods,
                            modifiers: ["profile-page"]
                        })), Object(i.div)({
                            className: "play-detail__pp"
                        }, s.pp > 0 ? Object(i.span)(null, ke.formatNumber(Math.round(s.pp)), Object(i.span)({
                            className: "play-detail__pp-unit"
                        }, "pp")) : Object(i.span)({
                            title: "ranked" !== (t = s.beatmapset.status) && "approved" !== t ? ke.trans("users.show.extra.top_ranks.not_ranked") : void 0
                        }, "-")), Object(i.div)({
                            className: "play-detail__more"
                        }, Se.a.hasMenu(s) ? Object(n.createElement)(Ce.a, {
                            score: s
                        }) : void 0)))
                    }, t.prototype.toggleCompact = function () {
                        return this.setState({
                            compact: !this.state.compact
                        })
                    }, t
                }(n.PureComponent),
                De = s("ZG74"),
                Be = function (e, t) {
                    return function () {
                        return e.apply(t, arguments)
                    }
                },
                $e = {}.hasOwnProperty;
            Ae = window.osu;
            var Le, Ie = function (e) {
                    function t(e) {
                        this.render = Be(this.render, this), t.__super__.constructor.call(this, e), this.activeKeyDidChange = De.c.bind(this), this.state = {}
                    }
                    return function (e, t) {
                        for (var s in t) $e.call(t, s) && (e[s] = t[s]);

                        function r() {
                            this.constructor = e
                        }
                        r.prototype = t.prototype, e.prototype = new r, e.__super__ = t.prototype
                    }(t, e), t.prototype.render = function () {
                        var e, t;
                        return null != this.state.activeKey && (e = ["menu-active"]), Object(n.createElement)(De.a.Provider, {
                            value: {
                                activeKeyDidChange: this.activeKeyDidChange
                            }
                        }, Object(i.div)({
                            className: Ae.classWithModifiers("play-detail-list", e)
                        }, this.props.scores.map((t = this, function (e, s) {
                            var r;
                            return r = t.state.activeKey === s, Object(n.createElement)(De.b.Provider, {
                                key: s,
                                value: s
                            }, Object(n.createElement)(Te, {
                                activated: r,
                                score: e
                            }))
                        }))))
                    }, t
                }(n.PureComponent),
                Re = function (e, t) {
                    return function () {
                        return e.apply(t, arguments)
                    }
                },
                He = {}.hasOwnProperty;
            Le = n.createElement;
            var We, Fe = function (e) {
                    function t(e) {
                        this.resizeCharts = Re(this.resizeCharts, this), this.updateTicks = Re(this.updateTicks, this), this.replaysWatchedCountsChartUpdate = Re(this.replaysWatchedCountsChartUpdate, this), this.monthlyPlaycountsChartUpdate = Re(this.monthlyPlaycountsChartUpdate, this), this.hasReplaysWatchedCounts = Re(this.hasReplaysWatchedCounts, this), this.hasMonthlyPlaycounts = Re(this.hasMonthlyPlaycounts, this), this.chartUpdate = Re(this.chartUpdate, this), this.render = Re(this.render, this), this.componentWillUnmount = Re(this.componentWillUnmount, this), this.componentDidUpdate = Re(this.componentDidUpdate, this), this.componentDidMount = Re(this.componentDidMount, this), t.__super__.constructor.call(this, e), this.id = "users-show-historical-" + osu.uuid(), this.monthlyPlaycountsChartArea = n.createRef(), this.replaysWatchedCountsChartArea = n.createRef(), this.charts = {}
                    }
                    return function (e, t) {
                        for (var s in t) He.call(t, s) && (e[s] = t[s]);

                        function r() {
                            this.constructor = e
                        }
                        r.prototype = t.prototype, e.prototype = new r, e.__super__ = t.prototype
                    }(t, e), t.prototype.componentDidMount = function () {
                        return $(window).on("throttled-resize." + this.id, this.resizeCharts), this.monthlyPlaycountsChartUpdate(), this.replaysWatchedCountsChartUpdate()
                    }, t.prototype.componentDidUpdate = function () {
                        return this.monthlyPlaycountsChartUpdate(), this.replaysWatchedCountsChartUpdate()
                    }, t.prototype.componentWillUnmount = function () {
                        return $(window).off("." + this.id)
                    }, t.prototype.render = function () {
                        var e, t, s;
                        return Object(i.div)({
                            className: "page-extra"
                        }, Le(o.a, {
                            name: this.props.name,
                            withEdit: this.props.withEdit
                        }), this.hasMonthlyPlaycounts() ? Object(i.div)(null, Object(i.h3)({
                            className: "title title--page-extra-small"
                        }, osu.trans("users.show.extra.historical.monthly_playcounts.title")), Object(i.div)({
                            className: "page-extra__chart",
                            ref: this.monthlyPlaycountsChartArea
                        })) : void 0, Object(i.h3)({
                            className: "title title--page-extra-small"
                        }, osu.trans("users.show.extra.historical.most_played.title")), (null != (t = this.props.beatmapPlaycounts) ? t.length : void 0) ? [function () {
                            var t, s, r, a;
                            for (a = [], t = 0, s = (r = this.props.beatmapPlaycounts).length; t < s; t++) e = r[t], a.push(Le(Pe, {
                                key: e.beatmap.id,
                                playcount: e,
                                currentMode: this.props.currentMode
                            }));
                            return a
                        }.call(this), Le(m.a, {
                            key: "show-more-row",
                            modifiers: ["profile-page", "t-greyseafoam-dark"],
                            event: "profile:showMore",
                            hasMore: this.props.pagination.beatmapPlaycounts.hasMore,
                            loading: this.props.pagination.beatmapPlaycounts.loading,
                            data: {
                                name: "beatmapPlaycounts",
                                url: laroute.route("users.beatmapsets", {
                                    user: this.props.user.id,
                                    type: "most_played"
                                })
                            }
                        })] : Object(i.p)(null, osu.trans("users.show.extra.historical.empty")), Object(i.h3)({
                            className: "title title--page-extra-small"
                        }, osu.trans("users.show.extra.historical.recent_plays.title")), (null != (s = this.props.scoresRecent) ? s.length : void 0) ? [Le(Ie, {
                            key: "play-detail-list",
                            scores: this.props.scoresRecent
                        }), Le(m.a, {
                            key: "show-more-row",
                            modifiers: ["profile-page", "t-greyseafoam-dark"],
                            event: "profile:showMore",
                            hasMore: this.props.pagination.scoresRecent.hasMore,
                            loading: this.props.pagination.scoresRecent.loading,
                            data: {
                                name: "scoresRecent",
                                url: laroute.route("users.scores", {
                                    user: this.props.user.id,
                                    type: "recent",
                                    mode: this.props.currentMode
                                })
                            }
                        })] : Object(i.p)(null, osu.trans("users.show.extra.historical.empty")), this.hasReplaysWatchedCounts() ? Object(i.div)(null, Object(i.h3)({
                            className: "title title--page-extra-small"
                        }, osu.trans("users.show.extra.historical.replays_watched_counts.title")), Object(i.div)({
                            className: "page-extra__chart",
                            ref: this.replaysWatchedCountsChartArea
                        })) : void 0)
                    }, t.prototype.chartUpdate = function (e, t) {
                        var s, r, a;
                        return r = function (e, t) {
                            var s, r;
                            return e.length > 0 && (s = _.last(e), r = t.x.diff(s.x, "months") - 1, _.times(r, (function (t) {
                                return e.push({
                                    x: s.x.clone().add(t + 1, "months"),
                                    y: 0
                                })
                            }))), e.push(t), e
                        }, 1 === (s = _(this.props.user[e]).sortBy("start_date").map((function (e) {
                            return {
                                x: moment(e.start_date),
                                y: e.count
                            }
                        })).reduce(r, [])).length && s.unshift({
                            x: s[0].x.clone().subtract(1, "month"),
                            y: 0
                        }), null == this.charts[e] && (a = {
                            curve: d3.curveLinear,
                            formats: {
                                x: function (e) {
                                    return moment(e).format(osu.trans("common.datetime.year_month_short.moment"))
                                },
                                y: function (e) {
                                    return osu.formatNumber(e)
                                }
                            },
                            margins: {
                                right: 60
                            },
                            infoBoxFormats: {
                                x: function (e) {
                                    return moment(e).format(osu.trans("common.datetime.year_month.moment"))
                                },
                                y: function (t) {
                                    return "<strong>" + osu.trans("users.show.extra.historical." + e + ".count_label") + "</strong> " + _.escape(osu.formatNumber(t))
                                }
                            },
                            tickValues: {},
                            ticks: {},
                            circleLine: !0,
                            modifiers: ["profile-page"]
                        }, this.charts[e] = new LineChart(t, a)), this.updateTicks(this.charts[e], s), this.charts[e].loadData(s)
                    }, t.prototype.hasMonthlyPlaycounts = function () {
                        return this.props.user.monthly_playcounts.length > 0
                    }, t.prototype.hasReplaysWatchedCounts = function () {
                        return this.props.user.replays_watched_counts.length > 0
                    }, t.prototype.monthlyPlaycountsChartUpdate = function () {
                        if (this.hasMonthlyPlaycounts()) return this.chartUpdate("monthly_playcounts", this.monthlyPlaycountsChartArea.current)
                    }, t.prototype.replaysWatchedCountsChartUpdate = function () {
                        if (this.hasReplaysWatchedCounts()) return this.chartUpdate("replays_watched_counts", this.replaysWatchedCountsChartArea.current)
                    }, t.prototype.updateTicks = function (e, t) {
                        return osu.isDesktop() ? (e.options.ticks.x = null, null == t && (t = e.data), e.options.tickValues.x = t.length < 10 ? t.map((function (e) {
                            return e.x
                        })) : null) : (e.options.ticks.x = Math.min(6, (null != t ? t : e.data).length), e.options.tickValues.x = null)
                    }, t.prototype.resizeCharts = function () {
                        var e, t, s, r;
                        for (e in r = [], s = this.charts) He.call(s, e) && (t = s[e], this.updateTicks(t), r.push(t.resize()));
                        return r
                    }, t
                }(n.PureComponent),
                ze = s("vt1Y"),
                Je = function (e, t) {
                    return function () {
                        return e.apply(t, arguments)
                    }
                },
                Ve = {}.hasOwnProperty;
            We = n.createElement;
            var Ke, qe = function (e) {
                    function t(e) {
                        this.onMouseOver = Je(this.onMouseOver, this), this.achievementDateElem = Je(this.achievementDateElem, this), this.render = Je(this.render, this), t.__super__.constructor.call(this, e), this.tooltip = n.createRef()
                    }
                    return function (e, t) {
                        for (var s in t) Ve.call(t, s) && (e[s] = t[s]);

                        function r() {
                            this.constructor = e
                        }
                        r.prototype = t.prototype, e.prototype = new r, e.__super__ = t.prototype
                    }(t, e), t.prototype.render = function () {
                        var e, t;
                        return this.tooltipId = this.props.achievement.slug + "-" + osu.uuid(), e = osu.classWithModifiers("badge-achievement", this.props.modifiers), t = "badge-achievement badge-achievement--dynamic-height", null == this.props.userAchievement && (t += " badge-achievement--locked", e += " badge-achievement--locked"), Object(i.div)({
                            className: "js-tooltip-achievement " + e + " " + this.props.additionalClasses
                        }, We(ye.a, {
                            alt: this.props.achievement.name,
                            className: "badge-achievement__image",
                            onMouseOver: this.onMouseOver,
                            src: this.props.achievement.icon_url
                        }), Object(i.div)({
                            className: "hidden"
                        }, Object(i.div)({
                            className: "js-tooltip-achievement--content tooltip-achievement__main",
                            ref: this.tooltip
                        }, Object(i.div)({
                            className: "tooltip-achievement__badge"
                        }, Object(i.div)({
                            className: t
                        }, We(ye.a, {
                            alt: this.props.achievement.name,
                            className: "badge-achievement__image",
                            src: this.props.achievement.icon_url
                        }))), Object(i.div)({
                            className: "tooltip-achievement__grouping"
                        }, this.props.achievement.grouping), Object(i.div)({
                            className: "tooltip-achievement__detail-container " + (null != this.props.achievement.instructions ? "tooltip-achievement__detail-container--hoverable" : "")
                        }, Object(i.div)({
                            className: "tooltip-achievement__detail tooltip-achievement__detail--normal"
                        }, Object(i.div)({
                            className: "tooltip-achievement__name"
                        }, this.props.achievement.name), Object(i.div)({
                            className: "tooltip-achievement__description",
                            dangerouslySetInnerHTML: {
                                __html: this.props.achievement.description
                            }
                        })), null != this.props.achievement.instructions ? Object(i.div)({
                            className: "tooltip-achievement__detail tooltip-achievement__detail--hover"
                        }, Object(i.div)({
                            className: "tooltip-achievement__instructions",
                            dangerouslySetInnerHTML: {
                                __html: this.props.achievement.instructions
                            }
                        })) : void 0), null != this.props.userAchievement ? Object(i.div)({
                            className: "tooltip-achievement__date",
                            dangerouslySetInnerHTML: {
                                __html: osu.trans("users.show.extra.achievements.achieved-on", {
                                    date: this.achievementDateElem()
                                })
                            }
                        }) : Object(i.div)({
                            className: "tooltip-achievement__date"
                        }, osu.trans("users.show.extra.achievements.locked")))))
                    }, t.prototype.achievementDateElem = function () {
                        var e;
                        return (e = document.createElement("span")).classList.add("js-tooltip-time"), e.title = this.props.userAchievement.achieved_at, e.textContent = moment(this.props.userAchievement.achieved_at).format("ll"), e.outerHTML
                    }, t.prototype.onMouseOver = function (e) {
                        var t, s, r, a;
                        if (e.persist(), (r = e.currentTarget)._loadedTooltipId !== this.tooltipId) return t = $(this.tooltip.current).clone(), null != r._loadedTooltipId ? (r._loadedTooltipId = this.tooltipId, void $(r).qtip("set", {
                            "content.text": t
                        })) : (r._loadedTooltipId = this.tooltipId, s = "qtip tooltip-achievement", null == this.props.userAchievement && (s += " tooltip-achievement--locked"), a = {
                            overwrite: !1,
                            content: t,
                            position: {
                                my: "bottom center",
                                at: "top center",
                                viewport: $(window),
                                adjust: {
                                    scroll: !1
                                }
                            },
                            show: {
                                event: e.type,
                                ready: !0,
                                delay: 200
                            },
                            hide: {
                                fixed: !0,
                                delay: 200
                            },
                            style: {
                                classes: s,
                                tip: {
                                    width: 30,
                                    height: 20
                                }
                            }
                        }, $(r).qtip(a, e))
                    }, t
                }(n.PureComponent),
                Ye = function (e, t) {
                    return function () {
                        return e.apply(t, arguments)
                    }
                },
                Ge = {}.hasOwnProperty;
            Ke = n.createElement;
            var Ze, Xe = function (e) {
                    function t() {
                        return this.userAchievement = Ye(this.userAchievement, this), this.recentAchievements = Ye(this.recentAchievements, this), this.orderedAchievements = Ye(this.orderedAchievements, this), this.medal = Ye(this.medal, this), this.groupedAchievements = Ye(this.groupedAchievements, this), this.currentModeFilter = Ye(this.currentModeFilter, this), this.render = Ye(this.render, this), t.__super__.constructor.apply(this, arguments)
                    }
                    return function (e, t) {
                        for (var s in t) Ge.call(t, s) && (e[s] = t[s]);

                        function r() {
                            this.constructor = e
                        }
                        r.prototype = t.prototype, e.prototype = new r, e.__super__ = t.prototype
                    }(t, e), t.prototype.render = function () {
                        var e, t, s, r, a, n, p;
                        return this.userAchievements = null, s = function () {
                            var e, s;
                            for (a in s = [], e = this.groupedAchievements()) Ge.call(e, a) && (r = e[a], s.push(Object(i.div)({
                                key: a,
                                className: "medals-group__group"
                            }, Object(i.h3)({
                                className: "medals-group__title"
                            }, a), function () {
                                var e, s;
                                for (n in s = [], e = this.orderedAchievements(r)) Ge.call(e, n) && (t = e[n], s.push(Object(i.div)({
                                    key: n,
                                    className: "medals-group__medals"
                                }, t.map(this.medal))));
                                return s
                            }.call(this))));
                            return s
                        }.call(this), p = this.recentAchievements(), Object(i.div)({
                            className: "page-extra"
                        }, Ke(o.a, {
                            name: this.props.name,
                            withEdit: this.props.withEdit
                        }), p.length > 0 ? Object(i.div)({
                            className: "page-extra__recent-medals-box"
                        }, Object(i.div)({
                            className: "title title--page-extra-small"
                        }, osu.trans("users.show.extra.medals.recent")), Object(i.div)({
                            className: "page-extra__recent-medals"
                        }, function () {
                            var t, s, r;
                            for (r = [], t = 0, s = p.length; t < s; t++) e = p[t], r.push(Object(i.div)({
                                className: "page-extra__recent-medal",
                                key: e.achievement_id
                            }, Ke(qe, {
                                achievement: this.props.achievements[e.achievement_id],
                                userAchievement: e,
                                modifiers: ["dynamic-height"]
                            })));
                            return r
                        }.call(this))) : void 0, Object(i.div)({
                            className: "medals-group"
                        }, s), 0 === s.length ? osu.trans("users.show.extra.medals.empty") : void 0)
                    }, t.prototype.currentModeFilter = function (e) {
                        return null == e.mode || e.mode === this.props.currentMode
                    }, t.prototype.groupedAchievements = function () {
                        var e, t;
                        return e = currentUser.id === this.props.user.id, _.chain(this.props.achievements).values().filter(this.currentModeFilter).filter((t = this, function (s) {
                            return t.userAchievement(s.id) || e
                        })).groupBy((function (e) {
                            return e.grouping
                        })).value()
                    }, t.prototype.medal = function (e) {
                        return Object(i.div)({
                            key: e.id,
                            className: "medals-group__medal"
                        }, Ke(qe, {
                            modifiers: ["listing"],
                            achievement: e,
                            userAchievement: this.userAchievement(e.id)
                        }))
                    }, t.prototype.orderedAchievements = function (e) {
                        return _.groupBy(e, (function (e) {
                            return e.ordering
                        }))
                    }, t.prototype.recentAchievements = function () {
                        var e, t, s, r, a, o;
                        for (a = [], t = 0, s = (r = this.props.userAchievements).length; t < s && (o = r[t], e = this.props.achievements[o.achievement_id], this.currentModeFilter(e) && a.push(o), !(a.length >= 8)); t++);
                        return a
                    }, t.prototype.userAchievement = function (e) {
                        return null == this.userAchievements && (this.userAchievements = _.keyBy(this.props.userAchievements, "achievement_id")), this.userAchievements[e]
                    }, t
                }(n.PureComponent),
                Qe = function (e, t) {
                    return function () {
                        return e.apply(t, arguments)
                    }
                },
                et = {}.hasOwnProperty;
            Ze = n.createElement;
            var tt, st = function (e) {
                    var t;

                    function s() {
                        return this._renderEntry = Qe(this._renderEntry, this), this.render = Qe(this.render, this), s.__super__.constructor.apply(this, arguments)
                    }
                    return function (e, t) {
                        for (var s in t) et.call(t, s) && (e[s] = t[s]);

                        function r() {
                            this.constructor = e
                        }
                        r.prototype = t.prototype, e.prototype = new r, e.__super__ = t.prototype
                    }(s, e), t = function (e, t) {
                        return osu.link(e, t, {
                            classNames: ["profile-extra-entries__link"]
                        })
                    }, s.prototype.render = function () {
                        return Object(i.div)({
                            className: "page-extra"
                        }, Ze(o.a, {
                            name: this.props.name,
                            withEdit: this.props.withEdit
                        }), this.props.recentActivity.length ? Object(i.div)(null, Object(i.ul)({
                            className: "profile-extra-entries"
                        }, this.props.recentActivity.map(this._renderEntry)), Object(i.div)({
                            className: "profile-extra-entries__item"
                        }, Ze(m.a, {
                            modifiers: ["profile-page", "t-greyseafoam-dark"],
                            event: "profile:showMore",
                            hasMore: this.props.pagination.recentActivity.hasMore,
                            loading: this.props.pagination.recentActivity.loading,
                            data: {
                                name: "recentActivity",
                                url: laroute.route("users.recent-activity", {
                                    user: this.props.user.id
                                })
                            }
                        }))) : Object(i.p)({
                            className: "profile-extra-entries"
                        }, osu.trans("events.empty")))
                    }, s.prototype._renderEntry = function (e) {
                        var s, r;
                        if (!e.parse_error) {
                            switch (e.type) {
                                case "achievement":
                                    s = Object(i.div)({
                                        className: "profile-extra-entries__icon"
                                    }, Ze(qe, {
                                        modifiers: ["recent-activity"],
                                        achievement: e.achievement,
                                        userAchievement: {
                                            achieved_at: e.createdAt,
                                            achievement_id: e.achievement.id
                                        }
                                    })), r = Object(i.div)({
                                        className: "profile-extra-entries__text",
                                        dangerouslySetInnerHTML: {
                                            __html: osu.trans("events.achievement", {
                                                user: t(e.user.url, e.user.username),
                                                achievement: e.achievement.name
                                            })
                                        }
                                    });
                                    break;
                                case "beatmapPlaycount":
                                    r = Object(i.div)({
                                        className: "profile-extra-entries__text",
                                        dangerouslySetInnerHTML: {
                                            __html: osu.trans("events.beatmap_playcount", {
                                                beatmap: t(e.beatmap.url, e.beatmap.title),
                                                count: e.count
                                            })
                                        }
                                    });
                                    break;
                                case "beatmapsetApprove":
                                    r = Object(i.div)({
                                        className: "profile-extra-entries__text",
                                        dangerouslySetInnerHTML: {
                                            __html: osu.trans("events.beatmapset_approve", {
                                                approval: e.approval,
                                                beatmapset: t(e.beatmapset.url, e.beatmapset.title),
                                                user: t(e.user.url, e.user.username)
                                            })
                                        }
                                    });
                                    break;
                                case "beatmapsetDelete":
                                    r = Object(i.div)({
                                        className: "profile-extra-entries__text",
                                        dangerouslySetInnerHTML: {
                                            __html: osu.trans("events.beatmapset_delete", {
                                                beatmapset: t(e.beatmapset.url, e.beatmapset.title)
                                            })
                                        }
                                    });
                                    break;
                                case "beatmapsetRevive":
                                    r = Object(i.div)({
                                        className: "profile-extra-entries__text",
                                        dangerouslySetInnerHTML: {
                                            __html: osu.trans("events.beatmapset_revive", {
                                                beatmapset: t(e.beatmapset.url, e.beatmapset.title),
                                                user: t(e.user.url, e.user.username)
                                            })
                                        }
                                    });
                                    break;
                                case "beatmapsetUpdate":
                                    r = Object(i.div)({
                                        className: "profile-extra-entries__text",
                                        dangerouslySetInnerHTML: {
                                            __html: osu.trans("events.beatmapset_update", {
                                                user: t(e.user.url, e.user.username),
                                                beatmapset: t(e.beatmapset.url, e.beatmapset.title)
                                            })
                                        }
                                    });
                                    break;
                                case "beatmapsetUpload":
                                    r = Object(i.div)({
                                        className: "profile-extra-entries__text",
                                        dangerouslySetInnerHTML: {
                                            __html: osu.trans("events.beatmapset_upload", {
                                                beatmapset: t(e.beatmapset.url, e.beatmapset.title),
                                                user: t(e.user.url, e.user.username)
                                            })
                                        }
                                    });
                                    break;
                                case "medal":
                                    return;
                                case "rank":
                                    s = Object(i.div)({
                                        className: "profile-extra-entries__icon"
                                    }, Object(i.div)({
                                        className: "score-rank score-rank--" + e.scoreRank
                                    })), r = Object(i.div)({
                                        className: "profile-extra-entries__text",
                                        dangerouslySetInnerHTML: {
                                            __html: osu.trans("events.rank", {
                                                user: t(e.user.url, e.user.username),
                                                rank: e.rank,
                                                beatmap: t(e.beatmap.url, e.beatmap.title),
                                                mode: osu.trans("beatmaps.mode." + e.mode)
                                            })
                                        }
                                    });
                                    break;
                                case "rankLost":
                                    r = Object(i.div)({
                                        className: "profile-extra-entries__text",
                                        dangerouslySetInnerHTML: {
                                            __html: osu.trans("events.rank_lost", {
                                                user: t(e.user.url, e.user.username),
                                                rank: e.rank,
                                                beatmap: t(e.beatmap.url, e.beatmap.title),
                                                mode: osu.trans("beatmaps.mode." + e.mode)
                                            })
                                        }
                                    });
                                    break;
                                case "userSupportAgain":
                                    r = Object(i.div)({
                                        className: "profile-extra-entries__text",
                                        dangerouslySetInnerHTML: {
                                            __html: osu.trans("events.user_support_again", {
                                                user: t(e.user.url, e.user.username)
                                            })
                                        }
                                    });
                                    break;
                                case "userSupportFirst":
                                    r = Object(i.div)({
                                        className: "profile-extra-entries__text",
                                        dangerouslySetInnerHTML: {
                                            __html: osu.trans("events.user_support_first", {
                                                user: t(e.user.url, e.user.username)
                                            })
                                        }
                                    });
                                    break;
                                case "userSupportGift":
                                    r = Object(i.div)({
                                        className: "profile-extra-entries__text",
                                        dangerouslySetInnerHTML: {
                                            __html: osu.trans("events.user_support_gift", {
                                                user: t(e.user.url, e.user.username)
                                            })
                                        }
                                    });
                                    break;
                                case "usernameChange":
                                    r = Object(i.div)({
                                        className: "profile-extra-entries__text",
                                        dangerouslySetInnerHTML: {
                                            __html: osu.trans("events.username_change", {
                                                user: t(e.user.url, e.user.username),
                                                previousUsername: e.user.previousUsername
                                            })
                                        }
                                    });
                                    break;
                                default:
                                    return
                            }
                            return null == s && (s = Object(i.div)({
                                className: "profile-extra-entries__icon"
                            })), Object(i.li)({
                                className: "profile-extra-entries__item",
                                key: e.id
                            }, Object(i.div)({
                                className: "profile-extra-entries__detail"
                            }, s, r), Object(i.div)({
                                className: "profile-extra-entries__time",
                                dangerouslySetInnerHTML: {
                                    __html: osu.timeago(e.createdAt)
                                }
                            }))
                        }
                    }, s
                }(n.PureComponent),
                rt = function (e, t) {
                    return function () {
                        return e.apply(t, arguments)
                    }
                },
                at = {}.hasOwnProperty;
            tt = n.createElement;
            var ot, nt = function (e) {
                    function t() {
                        return this.renderScores = rt(this.renderScores, this), this.render = rt(this.render, this), t.__super__.constructor.apply(this, arguments)
                    }
                    return function (e, t) {
                        for (var s in t) at.call(t, s) && (e[s] = t[s]);

                        function r() {
                            this.constructor = e
                        }
                        r.prototype = t.prototype, e.prototype = new r, e.__super__ = t.prototype
                    }(t, e), t.prototype.render = function () {
                        return Object(i.div)({
                            className: "page-extra"
                        }, tt(o.a, {
                            name: this.props.name,
                            withEdit: this.props.withEdit
                        }), Object(i.div)(null, Object(i.h3)({
                            className: "title title--page-extra-small"
                        }, osu.trans("users.show.extra.top_ranks.best.title")), this.renderScores("scoresBest", "best")), Object(i.div)(null, Object(i.h3)({
                            className: "title title--page-extra-small"
                        }, osu.trans("users.show.extra.top_ranks.first.title"), " ", this.props.user.scores_first_count > 0 ? Object(i.span)({
                            className: "title__count"
                        }, osu.formatNumber(this.props.user.scores_first_count)) : void 0), this.renderScores("scoresFirsts", "firsts")))
                    }, t.prototype.renderScores = function (e, t) {
                        var s, r;
                        return s = this.props.pagination[e], (null != (r = this.props[e]) ? r.error : void 0) ? Object(i.p)({
                            className: "profile-extra-entries"
                        }, r.error) : (null != r ? r.length : void 0) ? Object(i.div)({
                            className: "profile-extra-entries"
                        }, tt(Ie, {
                            scores: r
                        }), Object(i.div)({
                            className: "profile-extra-entries__item"
                        }, tt(m.a, {
                            modifiers: ["profile-page", "t-greyseafoam-dark"],
                            event: "profile:showMore",
                            hasMore: s.hasMore,
                            loading: s.loading,
                            data: {
                                name: e,
                                url: laroute.route("users.scores", {
                                    user: this.props.user.id,
                                    type: t,
                                    mode: this.props.currentMode
                                })
                            }
                        }))) : Object(i.p)({
                            className: "profile-extra-entries"
                        }, osu.trans("users.show.extra.top_ranks.empty"))
                    }, t
                }(n.PureComponent),
                it = s("0EjP"),
                pt = function (e, t) {
                    return function () {
                        return e.apply(t, arguments)
                    }
                },
                ut = {}.hasOwnProperty;
            ot = n.createElement;
            var ct, lt = function (e) {
                    function t() {
                        return this.save = pt(this.save, this), this.cancel = pt(this.cancel, this), this.onChange = pt(this.onChange, this), this.render = pt(this.render, this), t.__super__.constructor.apply(this, arguments)
                    }
                    return function (e, t) {
                        for (var s in t) ut.call(t, s) && (e[s] = t[s]);

                        function r() {
                            this.constructor = e
                        }
                        r.prototype = t.prototype, e.prototype = new r, e.__super__ = t.prototype
                    }(t, e), t.prototype.render = function () {
                        return ot(it.a, {
                            modifiers: ["profile-page"],
                            rawValue: this.props.userPage.raw,
                            placeholder: osu.trans("users.show.page.placeholder"),
                            onChange: this.onChange
                        })
                    }, t.prototype.onChange = function (e) {
                        var t, s, r;
                        switch (t = e.event, s = e.type, r = e.value, s) {
                            case "cancel":
                                return this.cancel();
                            case "save":
                                return this.save({
                                    event: t,
                                    value: r
                                })
                        }
                    }, t.prototype.cancel = function () {
                        return $.publish("user:page:update", {
                            editing: !1
                        })
                    }, t.prototype.save = function (e) {
                        var t, s;
                        return t = e.event, (s = e.value) === this.props.userPage.raw ? this.cancel() : (LoadingOverlay.show(), $.ajax(laroute.route("users.page", {
                            user: this.props.user.id
                        }), {
                            method: "PUT",
                            dataType: "json",
                            data: {
                                body: s
                            }
                        }).done((function (e) {
                            return $.publish("user:page:update", {
                                html: e.html,
                                editing: !1,
                                raw: s,
                                initialRaw: s
                            })
                        })).fail(osu.emitAjaxError(t.target)).always(LoadingOverlay.hide))
                    }, t
                }(n.PureComponent),
                ht = function (e, t) {
                    return function () {
                        return e.apply(t, arguments)
                    }
                },
                dt = {}.hasOwnProperty;
            ct = n.createElement;
            var mt, _t, ft, vt, yt = function (e) {
                    function t() {
                        return this.pageShow = ht(this.pageShow, this), this.pageNew = ht(this.pageNew, this), this.render = ht(this.render, this), t.__super__.constructor.apply(this, arguments)
                    }
                    return function (e, t) {
                        for (var s in t) dt.call(t, s) && (e[s] = t[s]);

                        function r() {
                            this.constructor = e
                        }
                        r.prototype = t.prototype, e.prototype = new r, e.__super__ = t.prototype
                    }(t, e), t.prototype.render = function () {
                        var e, t;
                        return t = "" === this.props.userPage.initialRaw.trim(), e = this.props.withEdit || window.currentUser.is_moderator || window.currentUser.is_admin, Object(i.div)({
                            className: "page-extra page-extra--userpage"
                        }, ct(o.a, {
                            name: this.props.name,
                            withEdit: this.props.withEdit
                        }), this.props.userPage.editing || !e || t ? void 0 : Object(i.div)({
                            className: "page-extra__actions"
                        }, Object(i.button)({
                            type: "button",
                            title: osu.trans("users.show.page.button"),
                            className: "profile-page-toggle",
                            onClick: this.editStart
                        }, Object(i.span)({
                            className: "fas fa-pencil-alt"
                        }))), this.props.userPage.editing ? ct(lt, {
                            userPage: this.props.userPage,
                            user: this.props.user
                        }) : Object(i.div)({
                            className: "page-extra__content-overflow-wrapper-outer u-fancy-scrollbar"
                        }, this.props.withEdit && t ? this.pageNew() : Object(i.div)({
                            className: "page-extra__content-overflow-wrapper-inner"
                        }, this.pageShow())))
                    }, t.prototype.editStart = function () {
                        return $.publish("user:page:update", {
                            editing: !0
                        })
                    }, t.prototype.pageNew = function () {
                        return Object(i.div)({
                            className: "profile-extra-user-page profile-extra-user-page--new"
                        }, Object(i.button)({
                            className: "profile-extra-user-page__new-content  btn-osu btn-osu--lite btn-osu--profile-page-edit",
                            onClick: this.editStart,
                            disabled: !this.props.user.has_supported
                        }, osu.trans("users.show.page.edit_big")), Object(i.p)({
                            className: "profile-extra-user-page__new-content profile-extra-user-page__new-content--icon"
                        }, Object(i.span)({
                            className: "fas fa-edit"
                        })), Object(i.p)({
                            className: "profile-extra-user-page__new-content",
                            dangerouslySetInnerHTML: {
                                __html: osu.trans("users.show.page.description")
                            }
                        }), this.props.user.has_supported ? void 0 : Object(i.p)({
                            className: "profile-extra-user-page__new-content"
                        }, ct(N.a, {
                            mappings: {
                                ":link": Object(i.a)({
                                    href: laroute.route("store.products.show", {
                                        product: "supporter-tag"
                                    }),
                                    key: "link",
                                    target: "_blank"
                                }, osu.trans("users.show.page.restriction_info.link"))
                            },
                            pattern: osu.trans("users.show.page.restriction_info._")
                        })))
                    }, t.prototype.pageShow = function () {
                        return Object(i.div)({
                            dangerouslySetInnerHTML: {
                                __html: this.props.userPage.html
                            }
                        })
                    }, t
                }(n.Component),
                bt = s("dqUM"),
                gt = function (e, t) {
                    return function () {
                        return e.apply(t, arguments)
                    }
                },
                Ot = {}.hasOwnProperty;
            _t = n.createElement, ft = document.getElementsByClassName("js-switchable-mode-page--scrollspy"), vt = document.getElementsByClassName("js-switchable-mode-page--scrollspy-offset"), mt = function () {
                return "" + document.location.pathname + document.location.search
            };
            var jt = function (e) {
                function t(e) {
                    var s, r, a, o, i, p;
                    if (this.validMode = gt(this.validMode, this), this.userPageUpdate = gt(this.userPageUpdate, this), this.userUpdate = gt(this.userUpdate, this), this.updateOrder = gt(this.updateOrder, this), this.tabClick = gt(this.tabClick, this), this.setCurrentPage = gt(this.setCurrentPage, this), this.saveStateToContainer = gt(this.saveStateToContainer, this), this.pageScan = gt(this.pageScan, this), this.pageJump = gt(this.pageJump, this), this.showMore = gt(this.showMore, this), this.extraPageParams = gt(this.extraPageParams, this), this.extraPage = gt(this.extraPage, this), this.render = gt(this.render, this), this.componentWillUnmount = gt(this.componentWillUnmount, this), this.componentDidMount = gt(this.componentDidMount, this), t.__super__.constructor.call(this, e), this.tabs = n.createRef(), this.pages = n.createRef(), this.state = JSON.parse(null != (i = e.container.dataset.profilePageState) ? i : null), this.restoredState = null != this.state, !this.restoredState)
                        for (r in null != (a = location.hash.slice(1)) && (this.initialPage = a), this.state = {
                                currentMode: e.currentMode,
                                user: e.user,
                                userPage: {
                                    html: e.userPage.html,
                                    initialRaw: e.userPage.raw,
                                    raw: e.userPage.raw,
                                    editing: !1,
                                    selection: [0, 0]
                                },
                                profileOrder: e.user.profile_order.slice(0),
                                recentActivity: this.props.extras.recentActivity,
                                scoresBest: this.props.extras.scoresBest,
                                scoresFirsts: this.props.extras.scoresFirsts,
                                scoresRecent: this.props.extras.scoresRecent,
                                beatmapPlaycounts: this.props.extras.beatmapPlaycounts,
                                favouriteBeatmapsets: this.props.extras.favouriteBeatmapsets,
                                rankedAndApprovedBeatmapsets: this.props.extras.rankedAndApprovedBeatmapsets,
                                lovedBeatmapsets: this.props.extras.lovedBeatmapsets,
                                unrankedBeatmapsets: this.props.extras.unrankedBeatmapsets,
                                graveyardBeatmapsets: this.props.extras.graveyardBeatmapsets,
                                recentlyReceivedKudosu: this.props.extras.recentlyReceivedKudosu,
                                showMorePagination: {}
                            }, p = this.props.perPage) Ot.call(p, r) && (o = p[r], null == (s = this.state.showMorePagination)[r] && (s[r] = {}), this.state.showMorePagination[r].hasMore = this.state[r].length > o, this.state.showMorePagination[r].hasMore && this.state[r].pop())
                }
                return function (e, t) {
                    for (var s in t) Ot.call(t, s) && (e[s] = t[s]);

                    function r() {
                        this.constructor = e
                    }
                    r.prototype = t.prototype, e.prototype = new r, e.__super__ = t.prototype
                }(t, e), t.prototype.componentDidMount = function () {
                    var e;
                    if ($.subscribe("user:update.profilePage", this.userUpdate), $.subscribe("user:page:update.profilePage", this.userPageUpdate), $.subscribe("profile:showMore.profilePage", this.showMore), $.subscribe("profile:page:jump.profilePage", this.pageJump), $(window).on("throttled-scroll.profilePage", this.pageScan), $(document).on("turbolinks:before-cache.profilePage", this.saveStateToContainer), $(this.pages.current).sortable({
                            cursor: "move",
                            handle: ".js-profile-page-extra--sortable-handle",
                            items: ".js-sortable--page",
                            revert: 150,
                            scrollSpeed: 10,
                            update: this.updateOrder
                        }), $(this.tabs.current).sortable({
                            containment: "parent",
                            cursor: "move",
                            disabled: !this.props.withEdit,
                            items: ".js-sortable--tab",
                            revert: 150,
                            scrollSpeed: 0,
                            update: this.updateOrder,
                            start: (e = this, function () {
                                return Timeout.clear(e.draggingTabTimeout), e.draggingTab = !0
                            }),
                            stop: function (e) {
                                return function () {
                                    return e.draggingTabTimeout = Timeout.set(500, (function () {
                                        return e.draggingTab = !1
                                    }))
                                }
                            }(this)
                        }), osu.pageChange(), this.modeScrollUrl = mt(), !this.restoredState) return Timeout.set(0, function (e) {
                        return function () {
                            return e.pageJump(null, e.initialPage)
                        }
                    }(this))
                }, t.prototype.componentWillUnmount = function () {
                    var e, t, s;
                    for ($.unsubscribe(".profilePage"), $(window).off(".profilePage"), e = 0, t = (s = [this.pages, this.tabs]).length; e < t; e++) $(s[e].current).sortable("destroy");
                    return $(window).stop(), Timeout.clear(this.modeScrollTimeout)
                }, t.prototype.render = function () {
                    var e, t, s, r, a;
                    return r = this.props.user.is_bot ? ["me"] : this.state.profileOrder.slice(), _.isEmpty(this.state.user.account_history) || r.push("account_standing"), "" !== this.state.userPage.initialRaw.trim() || this.props.withEdit || _.pull(r, "me"), e = _.find(currentUser.blocks, {
                        target_id: this.state.user.id
                    }), Object(i.div)(e && !this.state.forceShow ? {
                        className: "osu-layout__no-scroll"
                    } : void 0, e ? Object(i.div)({
                        className: "osu-page"
                    }, _t(bt.a, {
                        type: "warning",
                        title: osu.trans("users.blocks.banner_text"),
                        message: Object(i.div)({
                            className: "grid-items grid-items--notification-banner-buttons"
                        }, Object(i.div)(null, _t(T.a, {
                            userId: this.props.user.id
                        })), Object(i.div)(null, Object(i.button)({
                            type: "button",
                            className: "textual-button",
                            onClick: (a = this, function () {
                                return a.setState({
                                    forceShow: !a.state.forceShow
                                })
                            })
                        }, Object(i.span)({}, Object(i.i)({
                            className: "textual-button__icon fas fa-low-vision"
                        }), " ", this.state.forceShow ? osu.trans("users.blocks.hide_profile") : osu.trans("users.blocks.show_profile")))))
                    })) : void 0, Object(i.div)({
                        className: "osu-layout osu-layout--full" + (e && !this.state.forceShow ? " osu-layout--masked" : "")
                    }, _t(we, {
                        user: this.state.user,
                        stats: this.state.user.statistics,
                        currentMode: this.state.currentMode,
                        withEdit: this.props.withEdit,
                        userAchievements: this.props.userAchievements
                    }), Object(i.div)({
                        className: "hidden-xs page-extra-tabs page-extra-tabs--profile-page js-switchable-mode-page--scrollspy-offset"
                    }, r.length > 1 ? Object(i.div)({
                        className: "osu-page"
                    }, Object(i.div)({
                        className: "page-mode page-mode--profile-page-extra",
                        ref: this.tabs
                    }, function () {
                        var e, s, a;
                        for (a = [], e = 0, s = r.length; e < s; e++) t = r[e], a.push(Object(i.a)({
                            className: "page-mode__item " + (this.isSortablePage(t) ? "js-sortable--tab" : void 0),
                            key: t,
                            "data-page-id": t,
                            onClick: this.tabClick,
                            href: "#" + t
                        }, _t(h.a, {
                            page: t,
                            currentPage: this.state.currentPage,
                            currentMode: this.state.currentMode
                        })));
                        return a
                    }.call(this))) : void 0), Object(i.div)({
                        className: "osu-layout__section osu-layout__section--users-extra"
                    }, Object(i.div)({
                        className: "osu-layout__row",
                        ref: this.pages
                    }, function () {
                        var e, t, a;
                        for (a = [], e = 0, t = r.length; e < t; e++) s = r[e], a.push(this.extraPage(s));
                        return a
                    }.call(this)))))
                }, t.prototype.extraPage = function (e) {
                    var t, s, r, a, o, n;
                    return s = (a = this.extraPageParams(e)).extraClass, r = a.props, t = a.component, o = "js-switchable-mode-page--scrollspy js-switchable-mode-page--page", this.isSortablePage(e) && (o += " js-sortable--page"), r.withEdit = this.props.withEdit, r.name = e, null == this.extraPages && (this.extraPages = {}), Object(i.div)({
                        key: e,
                        "data-page-id": e,
                        className: o + " " + s,
                        ref: (n = this, function (t) {
                            return n.extraPages[e] = t
                        })
                    }, _t(t, r))
                }, t.prototype.extraPageParams = function (e) {
                    switch (e) {
                        case "me":
                            return {
                                props: {
                                    userPage: this.state.userPage,
                                    user: this.state.user
                                }, component: yt
                            };
                        case "recent_activity":
                            return {
                                props: {
                                    pagination: this.state.showMorePagination,
                                    recentActivity: this.state.recentActivity,
                                    user: this.state.user
                                }, component: st
                            };
                        case "kudosu":
                            return {
                                props: {
                                    user: this.state.user,
                                    recentlyReceivedKudosu: this.state.recentlyReceivedKudosu,
                                    pagination: this.state.showMorePagination
                                }, component: ze.a
                            };
                        case "top_ranks":
                            return {
                                props: {
                                    user: this.state.user,
                                    scoresBest: this.state.scoresBest,
                                    scoresFirsts: this.state.scoresFirsts,
                                    currentMode: this.state.currentMode,
                                    pagination: this.state.showMorePagination
                                }, component: nt
                            };
                        case "beatmaps":
                            return {
                                props: {
                                    user: this.state.user,
                                    favouriteBeatmapsets: this.state.favouriteBeatmapsets,
                                    rankedAndApprovedBeatmapsets: this.state.rankedAndApprovedBeatmapsets,
                                    lovedBeatmapsets: this.state.lovedBeatmapsets,
                                    unrankedBeatmapsets: this.state.unrankedBeatmapsets,
                                    graveyardBeatmapsets: this.state.graveyardBeatmapsets,
                                    counts: {
                                        favouriteBeatmapsets: this.state.user.favourite_beatmapset_count,
                                        rankedAndApprovedBeatmapsets: this.state.user.ranked_and_approved_beatmapset_count,
                                        lovedBeatmapsets: this.state.user.loved_beatmapset_count,
                                        unrankedBeatmapsets: this.state.user.unranked_beatmapset_count,
                                        graveyardBeatmapsets: this.state.user.graveyard_beatmapset_count
                                    },
                                    pagination: this.state.showMorePagination
                                }, component: b
                            };
                        case "medals":
                            return {
                                props: {
                                    achievements: this.props.achievements,
                                    userAchievements: this.props.userAchievements,
                                    currentMode: this.state.currentMode,
                                    user: this.state.user
                                }, component: Xe
                            };
                        case "historical":
                            return {
                                props: {
                                    beatmapPlaycounts: this.state.beatmapPlaycounts,
                                    scoresRecent: this.state.scoresRecent,
                                    user: this.state.user,
                                    currentMode: this.state.currentMode,
                                    pagination: this.state.showMorePagination
                                }, component: Fe
                            };
                        case "account_standing":
                            return {
                                props: {
                                    user: this.state.user
                                }, component: l
                            }
                    }
                }, t.prototype.showMore = function (e, t) {
                    var s, r, a, o, n, i;
                    return s = t.name, i = t.url, o = null != (n = t.perPage) ? n : 50, r = this.state[s].length, null == (a = _.cloneDeep(this.state.showMorePagination))[s] && (a[s] = {}), a[s].loading = !0, this.setState({
                        showMorePagination: a
                    }, (function () {
                        return $.get(osu.updateQueryString(i, {
                            offset: r,
                            limit: o + 1
                        }), (e = this, function (t) {
                            var r, n, i;
                            return i = _.cloneDeep(e.state[s]).concat(t), (r = t.length > o) && i.pop(), (a = _.cloneDeep(e.state.showMorePagination))[s].loading = !1, a[s].hasMore = r, e.setState(((n = {})["" + s] = i, n.showMorePagination = a, n))
                        })).catch(function (e) {
                            return function (t) {
                                return osu.ajaxError(t), (a = _.cloneDeep(e.state.showMorePagination))[s].loading = !1, e.setState({
                                    showMorePagination: a
                                })
                            }
                        }(this));
                        var e
                    }))
                }, t.prototype.pageJump = function (e, t) {
                    var s, r;
                    if ("main" !== t) {
                        var a;
                        if (0 !== (r = $(this.extraPages[t])).length) return this.scrolling = !0, Timeout.clear(this.modeScrollTimeout), s = r.offset().top - vt[0].getBoundingClientRect().height, $(window).stop().scrollTo(window.stickyHeader.scrollOffset(s), 500, {
                            onAfter: (a = this, function () {
                                return a.setCurrentPage(null, t, (function () {
                                    return a.modeScrollTimeout = Timeout.set(100, (function () {
                                        return a.scrolling = !1
                                    }))
                                }))
                            })
                        });
                        this.pageScan()
                    } else this.setCurrentPage(null, t)
                }, t.prototype.pageScan = function () {
                    var e, t, s, r, a;
                    if (this.modeScrollUrl === mt() && !this.scrolling && 0 !== ft.length) {
                        if (e = vt[0].getBoundingClientRect().height, !osu.bottomPage()) {
                            for (t = 0, s = ft.length; t < s; t++)
                                if ((a = (r = ft[t]).getBoundingClientRect()).bottom - Math.min(.75 * a.height, 200) > e) return void this.setCurrentPage(null, r.dataset.pageId);
                            return this.setCurrentPage(null, r.dataset.pageId)
                        }
                        this.setCurrentPage(null, _.last(ft).dataset.pageId)
                    }
                }, t.prototype.saveStateToContainer = function () {
                    return this.props.container.dataset.profilePageState = JSON.stringify(this.state)
                }, t.prototype.setCurrentPage = function (e, t, s) {
                    var r, a;
                    return a = this, r = function () {
                        return "function" == typeof s && s(), "function" == typeof a.setHash ? a.setHash() : void 0
                    }, this.state.currentPage === t ? r() : this.setState({
                        currentPage: t
                    }, r)
                }, t.prototype.tabClick = function (e) {
                    if (e.preventDefault(), !this.draggingTab) return this.pageJump(null, e.currentTarget.dataset.pageId)
                }, t.prototype.updateOrder = function (e) {
                    var t, s, r;
                    return s = (t = $(e.target)).sortable("toArray", {
                        attribute: "data-page-id"
                    }), LoadingOverlay.show(), t.sortable("cancel"), this.setState({
                        profileOrder: s
                    }, (r = this, function () {
                        return $.ajax(laroute.route("account.options"), {
                            method: "PUT",
                            dataType: "JSON",
                            data: {
                                user_profile_customization: {
                                    extras_order: r.state.profileOrder
                                }
                            }
                        }).done((function (e) {
                            return $.publish("user:update", e)
                        })).fail((function (e) {
                            return osu.emitAjaxError()(e), r.setState({
                                profileOrder: r.state.user.profile_order
                            })
                        })).always(LoadingOverlay.hide)
                    }))
                }, t.prototype.userUpdate = function (e, t) {
                    return (null != t ? t.id : void 0) !== this.state.user.id ? this.forceUpdate() : this.setState({
                        user: _.assign({}, this.state.user, t)
                    })
                }, t.prototype.userPageUpdate = function (e, t) {
                    var s;
                    return s = _.cloneDeep(this.state.userPage), this.setState({
                        userPage: _.extend(s, t)
                    })
                }, t.prototype.validMode = function (e) {
                    var t;
                    return t = BeatmapHelper.modes, _.includes(t, e) ? e : t[0]
                }, t.prototype.isSortablePage = function (e) {
                    return _.includes(this.state.profileOrder, e)
                }, t
            }(n.PureComponent);
            reactTurbolinks.registerPersistent("profile-page", jt, !0, (function (e) {
                var t;
                return {
                    user: t = osu.parseJson("json-user"),
                    userPage: t.page,
                    userAchievements: t.user_achievements,
                    currentMode: osu.parseJson("json-currentMode"),
                    withEdit: t.id === window.currentUser.id,
                    achievements: _.keyBy(osu.parseJson("json-achievements"), "id"),
                    perPage: osu.parseJson("json-perPage"),
                    extras: osu.parseJson("json-extras"),
                    container: e
                }
            }))
        },
        NzAu: function (e, t) {
            e.exports = ReactDOMFactories
        },
        YLtl: function (e, t) {
            e.exports = _
        },
        cDcd: function (e, t) {
            e.exports = React
        },
        faye: function (e, t) {
            e.exports = ReactDOM
        }
    },
    [
        [11, 0]
    ]
]);
//# sourceMappingURL=profile-page.js.map