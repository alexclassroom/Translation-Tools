/* global document, ttools */

jQuery( document ).ready( function( $ ) {
	console.log( 'Loaded options-general.js' );

	console.log( 'Current screen is "' + ttools.current_screen + '"' );

	console.log( 'Compatible plugins installed: ' + JSON.stringify( ttools.compatible_plugins ) );

	// Detect if plugin Preferred Languages is active.
	if ( 'preferred-languages/preferred-languages.php' in ttools.compatible_plugins ) {
		console.log( 'Plugin Preferred Languages detected.' );
		// Load plugin Preferred Languages specific scripts.
		ttoolsPluginPreferredLanguagesSettings();
	} else {
		console.log( 'Plugin Preferred Languages not detected.' );
		// Load Translation Tools default scripts.
		ttoolsSettings();
	}

	// Detect if plugin Translation Stats is active.
	if ( 'translation-stats/translation-stats.php' in ttools.compatible_plugins ) {
		console.log( 'Plugin Translation Stats detected.' );
		// Load plugin Preferred Languages specific scripts.
		ttoolsPluginTranslationStatsSettings();
	} else {
		console.log( 'Plugin Translation Stats not detected.' );
	}

	/**
	 * Load Translation Tools default scripts.
	 *
	 * @since 1.2.0
	 */
	function ttoolsSettings() {
		// Select field ID.
		var selectID = '';

		switch ( ttools.current_screen ) {
			case 'options-general':

				// Add all Locales to the available languages list.
				ttoolsAddAllLocales( '.options-general-php select#WPLANG' );

				// Check each option of installed languages on General Settings language select.
				$( '#WPLANG > optgroup:eq(0) > option' ).each( function() {
					var value = $( this ).prop( 'value' );
					selectID = '.options-general-php select#WPLANG > optgroup:eq(0)';

					// Check if the Locale should be on the Installed languages group.
					if ( ! ttools.available_languages.includes( value ) && '' !== value ) {
						// Remove Locales that are not installed.
						ttoolsRemoveLocaleOption( selectID, value );
					} else {
						// Rename Locale and add attributes.
						ttoolsRenameLocaleOption( selectID, value );
					}
				} );

				// Check each option of available languages on General Settings language select.
				$( '#WPLANG > optgroup:eq(1) > option' ).each( function() {
					var value = $( this ).prop( 'value' );
					selectID = '.options-general-php select#WPLANG > optgroup:eq(1)';

					// Rename Locale and add attributes.
					ttoolsRenameLocaleOption( selectID, value );
				} );

				// Relocate Site Language description data on General Settings page.
				ttoolsRelocateAfterTarget( 'div#ttools_language_select_description', '.options-general-php select#WPLANG' );

				break;

			default:

				// Check each option of installed languages on Profile and User Edit language select.
				$( '#locale > option' ).each( function() {
					var value = $( this ).prop( 'value' );
					selectID = 'select#locale';

					// Check if the Locale should be on the Installed languages group.
					if ( ! ttools.available_languages.includes( value ) && '' !== value && 'site-default' !== value ) {
						// Remove Locales that are not installed.
						ttoolsRemoveLocaleOption( selectID, value );
					} else {
						// Rename Locale and add attributes.
						ttoolsRenameLocaleOption( selectID, value );
					}
				} );

				// Relocate Site Language description data on Profile and User Edit page.
				ttoolsRelocateAfterTarget( 'div#ttools_language_select_description', 'select#locale' );

				break;
		}
	}

	/**
	 * Load plugin Preferred Languages specific scripts.
	 *
	 * @since 1.2.0
	 */
	function ttoolsPluginPreferredLanguagesSettings() {
		// Select field ID.
		var selectID = '';

		// Add all Locales to the available languages list.
		ttoolsAddAllLocales( 'select#preferred-languages-inactive-locales' );

		// Check each option of installed languages on General Settings language select.
		$( 'select#preferred-languages-inactive-locales > optgroup:eq(0) > option' ).each( function() {
			var value = $( this ).prop( 'value' );
			selectID = 'select#preferred-languages-inactive-locales > optgroup:eq(0)';

			// Check if the Locale should be on the Installed languages group.
			if ( ! ttools.available_languages.includes( value ) && '' !== value ) {
				// Remove Locales that are not installed.
				ttoolsRemoveLocaleOption( selectID, value );
			} else {
				// Rename Locale and add attributes.
				ttoolsRenameLocaleOption( selectID, value );
			}
		} );

		// Check each option of available languages on language select.
		$( 'select#preferred-languages-inactive-locales > optgroup:eq(1) > option' ).each( function() {
			var value = $( this ).prop( 'value' );
			selectID = 'select#preferred-languages-inactive-locales > optgroup:eq(1)';

			// Rename Locale and add attributes.
			ttoolsRenameLocaleOption( selectID, value );
		} );

		// Check each list item of selected languages on language select.
		$( 'ul#preferred_languages > li' ).each( function() {
			var value = $( this ).prop( 'id' );
			selectID = 'ul#preferred_languages';

			// Don't rename 'en_US' language.
			if ( 'en_US' !== value ) {
				// Rename Locale and add attributes.
				ttoolsRenameLocaleListItem( selectID, value );
			}
		} );

		// Relocate Site Language description data on General Settings page.
		ttoolsRelocateAfterTarget( 'div#ttools_language_select_description', 'select#preferred-languages-inactive-locales' );
	}

	/**
	 * Load plugin Translation Stats specific scripts.
	 *
	 * @since 1.2.3
	 */
	function ttoolsPluginTranslationStatsSettings() {
		// Select field ID.
		var selectID = '';

		// Plugin file.
		var pluginFile = 'translation-stats/translation-stats.php';
		// Translation Stats language.
		var translationStatsLanguage = ttools.compatible_plugins[ pluginFile ].settings.translation_language;
		// Add all Locales to the available languages list.
		ttoolsAddAllLocales( 'select#tstats_settings\\[settings\\]\\[translation_language\\]' );

		// Check each option of installed languages on General Settings language select.
		$( 'select#tstats_settings\\[settings\\]\\[translation_language\\] > optgroup:eq(0) > option' ).each( function() {
			var value = $( this ).prop( 'value' );
			selectID = 'select#tstats_settings\\[settings\\]\\[translation_language\\] > optgroup:eq(0)';

			// Check if the Locale should be on the Installed languages group.
			if ( ! ttools.available_languages.includes( value ) && 'site-default' !== value && translationStatsLanguage !== value ) {
				// Remove Locales that are not installed.
				ttoolsRemoveLocaleOption( selectID, value );
			} else {
				// Rename Locale and add attributes.
				ttoolsRenameLocaleOption( selectID, value );
			}
		} );

		// Check each option of available languages on language select.
		$( 'select#tstats_settings\\[settings\\]\\[translation_language\\] > optgroup:eq(1) > option' ).each( function() {
			var value = $( this ).prop( 'value' );
			selectID = 'select#tstats_settings\\[settings\\]\\[translation_language\\] > optgroup:eq(1)';

			// Rename Locale and add attributes.
			ttoolsRenameLocaleOption( selectID, value );
		} );
	}

	/**
	 * Relocate description data and show.
	 *
	 * @since 1.1.0
	 * @param {string} origin - ID of the source to relocate.
	 * @param {string} target - ID of the target where to relocate after.
	 */
	function ttoolsRelocateAfterTarget( origin, target ) {
		// Translation Tools relocate after target ID.
		$( origin ).insertAfter( $( target ) );

		// Show item.
		$( origin ).show();

		console.log( 'Translation Tools Site Language description relocated.' );
	}

	/**
	 * Remove Locale option from the available languages installed group.
	 *
	 * @since 1.1.0
	 * @param {string} selectID - Select field ID.
	 * @param {string} value    - Option value.
	 */
	function ttoolsRemoveLocaleOption( selectID, value ) {
		// Remove option.
		$( selectID + ' > option[value="' + value + '"]' ).remove();

		console.log( 'Remove Locale option from the available languages: ' + value );
	}

	/**
	 * Set Locale name and option attributes for a target Select field.
	 *
	 * @since 1.1.0
	 * @since 1.2.0  Add option attributes.
	 * @param {string} selectID - Select field ID.
	 * @param {string} value    - Option value.
	 */
	function ttoolsRenameLocaleOption( selectID, value ) {
		// Rename Locales except 'en_US' (with empty value) and 'site-default'.
		if ( '' !== value && 'site-default' !== value ) {
			// Get all languages.
			var language = ttools.all_languages[ value ];

			// Set option name and attributes.
			$( selectID + ' > option[value="' + value + '"]' ).text( language.name ).attr( 'lang', language.lang ).attr( 'data-has-lang-packs', language.lang_packs );

			console.log( 'Rename Locale option from "' + language.value + '" to "' + language.name + '"' );
		}
	}

	/**
	 * Rename Locales that have only the value as name from Preferred Languages plugin unordered list items.
	 *
	 * @since 1.2.0
	 * @param {string} selectID - Select field ID.
	 * @param {string} value    - Option value.
	 */
	function ttoolsRenameLocaleListItem( selectID, value ) {
		// Get all languages.
		var language = ttools.all_languages[ value ];

		// Set option name and attributes.
		$( selectID + ' > li#' + value ).text( language.name ).attr( 'lang', language.lang ).attr( 'data-has-lang-packs', language.lang_packs );

		console.log( 'Rename Locale list item from "' + language.value + '" to "' + language.name + '"' );
	}

	/**
	 * Add all Locales the available languages list.
	 *
	 * @since 1.2.0
	 * @param {string} selectID - Select field ID.
	 */
	function ttoolsAddAllLocales( selectID ) {
		// Get all languages.
		var languages = ttools.all_languages;

		// Create options.
		var options = '';

		Object.values( languages ).forEach( function( language ) {
			options += '<option value="' + language.value + '">' + language.value + '</option>';
		} );

		// Set available languages list.
		$( selectID + ' > optgroup:eq(1)' ).html( options );

		console.log( 'Add Locales to the available languages list.' );

		console.log( 'Total Locales: ' + Object.keys( ttools.all_languages ).length );
	}
} );
